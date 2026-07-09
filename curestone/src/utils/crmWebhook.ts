const CRM_WEBHOOK_URL =
  "https://crm.thecurestone.com/api/webhook/website-leads?wh_token=a219235a3e0bca4bafac34581d23d4c3d64643b5e1e2eda329e9a7ff4670d57b";

type BookAppointmentLead = {
  form_type: "book_appointment";
  name: string;
  phone: string;
  state: string;
  stoneSize: string;
  consultationType: string;
  email?: string;
  description: string;
};

type GetEstimateLead = {
  form_type: "get_estimate";
  name: string;
  phone: string;
  consultationType: string;
};

export type CrmLeadPayload = BookAppointmentLead | GetEstimateLead;

export type CrmLeadResponse = {
  status: string;
  patient_id?: string;
  created?: boolean;
};

function postToCrm(payload: CrmLeadPayload) {
  return fetch(CRM_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(5000),
    body: JSON.stringify(payload),
  });
}

/**
 * Submits a lead to the CRM. This is the form's sole backend call, so
 * failures (network, timeout, non-2xx) are thrown for the caller's own
 * try/catch to surface to the user.
 *
 * The CRM runs on a separate origin from the site's own hosting, so the
 * visitor's browser sometimes has to pay a cold DNS/TLS/CORS-preflight
 * cost on the very first request to it, which can exceed the timeout.
 * A same-payload retry reuses that now-warm connection and normally
 * succeeds immediately — it's safe because the CRM itself treats a
 * resubmitted phone number as an existing lead (`created: false`), not
 * a duplicate error. Only network-level failures (timeout/DNS/TLS) are
 * retried; a real 400/401 response won't be fixed by trying again.
 */
export async function sendCrmLead(payload: CrmLeadPayload): Promise<CrmLeadResponse> {
  let res: Response;
  try {
    res = await postToCrm(payload);
  } catch (firstError) {
    console.warn("CRM webhook first attempt failed, retrying once:", firstError);
    res = await postToCrm(payload);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`CRM webhook returned ${res.status}: ${body}`);
  }

  return res.json();
}
