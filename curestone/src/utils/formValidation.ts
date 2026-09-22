export const INDIAN_PHONE_PATTERN = /^[6-9]\d{9}$/;

export function cleanText(value: FormDataEntryValue | null) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

export function normalizeIndianPhone(value: FormDataEntryValue | null) {
  return String(value || "").replace(/\D/g, "");
}

export function validateName(value: string) {
  if (!value) return "Full name is required.";
  if (value.length < 2) return "Please enter at least 2 characters.";
  if (value.length > 80) return "Name must be under 80 characters.";
  if (!/[a-zA-Z]/.test(value)) return "Name must include letters.";
  return "";
}

export function validateIndianPhone(value: string) {
  if (!value) return "Phone number is required.";
  if (value.length === 12 && value.startsWith("91")) {
    return "Enter only the 10-digit mobile number without +91.";
  }
  if (!INDIAN_PHONE_PATTERN.test(value)) {
    return "Enter a valid 10-digit Indian mobile number without +91.";
  }
  return "";
}

export function validateSelect(value: string, allowedValues: string[], label: string) {
  if (!value) return `${label} is required.`;
  if (!allowedValues.includes(value)) return `Select a valid ${label.toLowerCase()}.`;
  return "";
}

export function validateOptionalDescription(value: string, maxLength = 500) {
  if (!value) return "";
  if (value.length > maxLength) return `Description must be under ${maxLength} characters.`;
  return "";
}
