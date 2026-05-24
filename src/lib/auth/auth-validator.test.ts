import { describe, expect, it } from "vitest";

import { AuthValidator } from "./auth-validator";

describe("AuthValidator", () => {
  it("accepts E.164 phone numbers", () => {
    expect(AuthValidator.validatePhone("+14155552671")).toEqual({ isValid: true });
  });

  it("rejects phone numbers without a country code", () => {
    expect(AuthValidator.validatePhone("4155552671")).toEqual({
      isValid: false,
      error: "Give those digits a quick fix and have a country code!",
    });
  });

  it("sanitizes OTP input down to digits", () => {
    expect(AuthValidator.sanitizeOtp(" 12-34 56 ")).toBe("123456");
  });

  it("normalizes email casing and whitespace", () => {
    expect(AuthValidator.sanitizeEmail("  USER@Example.COM ")).toBe("user@example.com");
  });
});
