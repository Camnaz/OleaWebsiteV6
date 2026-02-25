import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, body } = await req.json();

    if (!name || !email || !subject || !body) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Olea Computer Contact <onboarding@resend.dev>",
      to: "cnazarko@icloud.com",
      replyTo: email,
      subject: `[Olea Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${body}`,
      html: `
        <div style="font-family: 'IBM Plex Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fafafa; color: #1a1a1a;">
          <h2 style="font-size: 20px; font-weight: 400; margin-bottom: 24px; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px;">New message via Olea Computer</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 12px; width: 80px;">From</td><td style="padding: 8px 0; font-size: 14px;">${name} &lt;${email}&gt;</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 12px;">Subject</td><td style="padding: 8px 0; font-size: 14px;">${subject}</td></tr>
          </table>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${body}</div>
          <p style="margin-top: 24px; font-size: 11px; color: #9ca3af;">Sent via oleacomputer.com contact form</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
