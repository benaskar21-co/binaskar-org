import { buildLlmsTxt, llmsTxtHeaders } from "@/lib/llms-txt";

/** Alias for /llms.txt — same curated index for LLM crawlers. */
export function GET() {
  return new Response(buildLlmsTxt(), { headers: llmsTxtHeaders });
}
