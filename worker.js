/**
 * Cloudflare Worker — Claude API proxy
 *
 * Deploy at: https://workers.cloudflare.com
 * Set environment variable: ANTHROPIC_API_KEY = your key
 *
 * CORS origin below: replace with your actual GitHub Pages URL
 * e.g. "https://yourusername.github.io"
 */

const ALLOWED_ORIGIN = "https://yourusername.github.io"; // ← change this

const SYSTEM_PROMPT = `You are an assistant on the personal academic website of Francesco Giordano, a PhD candidate in Economics at HEC Paris.

About Francesco:
- He studies game theory, information design, mechanism design, and decision theory.
- His applied work studies cognitive uncertainty in expert judgment, using data from a leading European startup incubator.
- He is advised by Tristan Tomala and Frédéric Koessler at HEC Paris.
- He is one of the organizers of the Junior Game Theory Seminar at the Institut Henri Poincaré, Paris.
- He is a research affiliate of the ION Management Science Lab at HEC Paris.

His papers:
1. "Coordination Mechanisms with Partially Specified Probabilities" (solo) — on arxiv: https://arxiv.org/abs/2605.07469
   Studies mechanism design when agents use maximum-entropy beliefs. Characterizes implementable outcomes via joint coherence.
2. "Ex-Post Equilibria" — with Julien Grand-Clément (HEC Paris) and Christian Kroer (Columbia). Draft coming soon.
   Studies strategy profiles that are Nash equilibria for every parameter realization in an uncertainty set.
3. "Cognitive Uncertainty in Venture Evaluation" — with Thomas Åstebro and Andrew Funck (HEC Paris). Draft coming soon.
   Models expert judges as Bayes classifiers facing cognitive uncertainty about venture quality.
4. "Decomposing Venture Evaluation: Learning about Belief Formation" — with Thomas Åstebro and Andrew Funck. R&R at Strategic Entrepreneurship Journal.
5. "A Note on Social Learning in Non-Atomic Routing Games" — Operations Research Letters (2023). https://www.sciencedirect.com/science/article/abs/pii/S0167637723000470

Contact: francesco.giordano@hec.edu

Guidelines:
- Be concise, precise, and friendly.
- Answer questions about Francesco's research, background, and papers.
- For questions unrelated to Francesco or his research, politely redirect.
- Do not invent details not listed above. If unsure, suggest contacting Francesco directly.
- Keep answers short (2–4 sentences unless more detail is requested).`;

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders(ALLOWED_ORIGIN),
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Basic origin check
    const origin = request.headers.get("Origin") || "";
    if (origin !== ALLOWED_ORIGIN) {
      return new Response("Forbidden", { status: 403 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("Bad request", { status: 400 });
    }

    const messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Bad request", { status: 400 });
    }

    // Call Anthropic API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(ALLOWED_ORIGIN),
      },
    });
  },
};

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
