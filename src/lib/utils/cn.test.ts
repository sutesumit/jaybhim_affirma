import { describe, expect, it } from "vitest";

import { cn } from "./cn";

describe("cn", () => {
  it("merges duplicate tailwind classes and keeps the latest value", () => {
    expect(cn("px-2", "px-4", "text-white")).toBe("px-4 text-white");
  });

  it("ignores falsey values while preserving valid classes", () => {
    expect(cn("flex", undefined, false && "hidden", "items-center")).toBe(
      "flex items-center",
    );
  });
});
