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

/**
 * Submits a lead to the CRM. This is the form's sole backend call, so
 * failures (network, timeout, non-2xx) are thrown for the caller's own
 * try/catch to surface to the user.
 */
export async function sendCrmLead(payload: CrmLeadPayload): Promise<CrmLeadResponse> {
  const res = await fetch(CRM_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(5000),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`CRM webhook returned ${res.status}: ${body}`);
  }

  return res.json();
}
