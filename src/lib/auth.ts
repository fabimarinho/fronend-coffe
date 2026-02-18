export function getAdminEmails() {
  const list = process.env.ADMIN_EMAILS ?? "";
  return list
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdmin(email: string | null | undefined) {
  if (!email) return false;
  const admins = getAdminEmails();
  return admins.includes(email.toLowerCase());
}
