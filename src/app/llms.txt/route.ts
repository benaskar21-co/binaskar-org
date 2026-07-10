import { buildLlmsTxt, llmsTxtHeaders } from "@/lib/llms-txt";

export function GET() {
  return new Response(buildLlmsTxt(), { headers: llmsTxtHeaders });
}
