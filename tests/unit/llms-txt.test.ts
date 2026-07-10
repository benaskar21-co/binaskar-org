import { describe, expect, it } from "vitest";

import { buildLlmsTxt } from "@/lib/llms-txt";

describe("buildLlmsTxt", () => {
  it("starts with H1 and blockquote per llms.txt spec", () => {
    const content = buildLlmsTxt();
    expect(content.startsWith("# Bin Askar Technology\n\n>")).toBe(true);
  });

  it("includes main bilingual pages and contact email", () => {
    const content = buildLlmsTxt();
    expect(content).toContain("/ar");
    expect(content).toContain("/en");
    expect(content).toContain("abdullah@binaskar.org");
    expect(content).toContain("minnha.sa");
    expect(content).toContain("hido.app");
  });
});
