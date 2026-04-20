import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, source_tool, tool_results, quiz_data } = await req.json();

    if (!email || !source_tool) {
      return new Response(
        JSON.stringify({ error: "Email e source_tool são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Formato de email inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Upsert lead into database
    const upsertData: Record<string, unknown> = {
      email: email.toLowerCase().trim(),
      source_tool,
    };
    if (name) upsertData.name = name;
    if (tool_results) upsertData.tool_results = tool_results;
    if (quiz_data) upsertData.quiz_data = quiz_data;

    const { error: dbError } = await supabase
      .from("leads")
      .upsert(upsertData, { onConflict: "email" });

    if (dbError) {
      console.error("Database error:", dbError);
      // Don't fail the request if DB insert fails
    }

    // Send email via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const guideUrl = "https://artemisfit.online/guia/seu-guia";
        const userName = name || "Guerreira";

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    
    <!-- Header -->
    <div style="text-align:center;margin-bottom:40px;">
      <div style="display:inline-block;padding:6px 16px;border-radius:100px;background-color:rgba(205,255,0,0.1);border:1px solid rgba(205,255,0,0.2);color:#CDFF00;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px;">
        ✨ Guia Exclusivo Artemis
      </div>
      <h1 style="color:#ffffff;font-size:28px;margin:0 0 8px 0;font-weight:bold;">
        ${userName}, seu Guia está pronto!
      </h1>
      <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:0;">
        Treino + Ciclo Menstrual — tudo que você precisa saber
      </p>
    </div>

    <!-- Main Card -->
    <div style="background-color:#141414;border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:32px;margin-bottom:24px;">
      <h2 style="color:#ffffff;font-size:20px;margin:0 0 12px 0;">O que você vai encontrar:</h2>
      
      <div style="margin-bottom:24px;">
        <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <span style="color:#CDFF00;font-weight:bold;">📅</span>
          <span style="color:rgba(255,255,255,0.8);font-size:14px;margin-left:8px;">As 4 fases do ciclo e como treinar em cada uma</span>
        </div>
        <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <span style="color:#CDFF00;font-weight:bold;">🧠</span>
          <span style="color:rgba(255,255,255,0.8);font-size:14px;margin-left:8px;">Quiz personalizado para identificar seus desafios</span>
        </div>
        <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <span style="color:#CDFF00;font-weight:bold;">❌✅</span>
          <span style="color:rgba(255,255,255,0.8);font-size:14px;margin-left:8px;">Mitos vs Verdades sobre treino feminino</span>
        </div>
        <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <span style="color:#CDFF00;font-weight:bold;">❓</span>
          <span style="color:rgba(255,255,255,0.8);font-size:14px;margin-left:8px;">FAQ com as 10 dúvidas mais comuns respondidas</span>
        </div>
        <div style="padding:12px 0;">
          <span style="color:#CDFF00;font-weight:bold;">🗺️</span>
          <span style="color:rgba(255,255,255,0.8);font-size:14px;margin-left:8px;">Plano de ação em 4 passos para resultados reais</span>
        </div>
      </div>

      <!-- CTA Button -->
      <div style="text-align:center;">
        <a href="${guideUrl}" style="display:inline-block;padding:16px 32px;background-color:#CDFF00;color:#0a0a0a;border-radius:100px;font-weight:bold;font-size:16px;text-decoration:none;">
          ⚡ Acessar Meu Guia Agora
        </a>
      </div>
    </div>

    <!-- Secondary CTA -->
    <div style="background-color:#141414;border:1px solid rgba(205,255,0,0.15);border-radius:24px;padding:24px;text-align:center;margin-bottom:24px;">
      <p style="color:rgba(255,255,255,0.6);font-size:13px;margin:0 0 16px 0;">
        Quer que tudo isso funcione <strong style="color:#ffffff;">automaticamente</strong>?<br>
        O Artemis Fit adapta treino + nutrição ao seu ciclo com IA.
      </p>
      <a href="https://app.artemisfit.online" style="display:inline-block;padding:12px 24px;background-color:rgba(205,255,0,0.1);border:1px solid rgba(205,255,0,0.3);color:#CDFF00;border-radius:100px;font-weight:bold;font-size:13px;text-decoration:none;">
        Conhecer o Artemis Fit →
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:20px 0;">
      <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">
        © ${new Date().getFullYear()} Artemis Fit · 
        <a href="https://artemisfit.online/privacidade" style="color:rgba(255,255,255,0.3);text-decoration:underline;">Privacidade</a>
      </p>
      <p style="color:rgba(255,255,255,0.15);font-size:10px;margin:8px 0 0 0;">
        Você recebeu este email porque se cadastrou em uma de nossas ferramentas gratuitas.
      </p>
    </div>

  </div>
</body>
</html>`;

        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Artemis Fit <guia@artemisfit.online>",
            to: [email],
            subject: `${userName}, seu Guia de Treino + Ciclo está pronto! ⚡`,
            html: emailHtml,
          }),
        });

        if (!resendResponse.ok) {
          const resendError = await resendResponse.text();
          console.error("Resend error:", resendError);
        }
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Don't fail the request if email sending fails
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Lead capturado com sucesso" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
