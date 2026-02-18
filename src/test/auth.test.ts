import { describe, expect, it } from "vitest";
import { getAdminEmails, isAdmin } from "../lib/auth";

describe("auth helpers", () => {
  it("normalizes admin emails from env", () => {
    process.env.ADMIN_EMAILS = " ADMIN@EXAMPLE.COM , team@example.com ,, ";

    expect(getAdminEmails()).toEqual(["admin@example.com", "team@example.com"]);
  });

  it("validates admin email case-insensitively", () => {
    process.env.ADMIN_EMAILS = "admin@example.com";

    expect(isAdmin("ADMIN@EXAMPLE.COM")).toBe(true);
    expect(isAdmin("user@example.com")).toBe(false);
    expect(isAdmin(undefined)).toBe(false);
  });
});
