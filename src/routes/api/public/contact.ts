import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(1).max(5000),
});

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }
        const { name, email, message } = parsed.data;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin
          .from("contact_messages")
          .insert({ name, email, message });
        if (error) {
          console.error("contact_messages insert failed", error);
          return Response.json({ error: "Could not save message" }, { status: 500 });
        }

        // Attempt to send email notification if Lovable email is configured.
        const apiKey = process.env.LOVABLE_API_KEY;
        if (apiKey) {
          try {
            await fetch("https://api.lovable.dev/v1/emails/send", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                to: "matej.sancin26@gmail.com",
                subject: `New contact message from ${name}`,
                html: `<h2>New message from Sancin Audio website</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
              }),
            });
          } catch (e) {
            console.error("email send failed (non-blocking)", e);
          }
        }

        return Response.json({ ok: true });
      },
    },
  },
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
