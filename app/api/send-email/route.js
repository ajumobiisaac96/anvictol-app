import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { to_email, from_name, from_email, message } = body;

    // Validate required fields
    if (!from_name || !from_email || !message || !to_email) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Nodemailer transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "ajumobiisaac96@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #0A1F44; margin-bottom: 20px;">New Contact Form Submission</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 5px; border-left: 4px solid #22c55e;">
              <p><strong>Name:</strong> ${from_name}</p>
              <p><strong>Email:</strong> ${from_email}</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; word-wrap: break-word;">${message}</p>
            </div>
            
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              This is an automated message from your website contact form.
            </p>
          </div>
        </body>
      </html>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "ajumobiisaac96@gmail.com",
      to: to_email,
      subject: `New Contact Form Submission from ${from_name}`,
      html: htmlContent,
      replyTo: from_email,
    });

    // Optional: Send confirmation email to user
    const userConfirmationHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #0A1F44; margin-bottom: 20px;">Thank You for Contacting Anvictol!</h2>
            
            <p>Hi ${from_name},</p>
            
            <p>We have received your message and appreciate you reaching out to us. Our team will review your inquiry and get back to you within <strong>24 hours</strong>.</p>
            
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #0A1F44;">
              <p><strong>Your Message:</strong></p>
              <p style="white-space: pre-wrap; word-wrap: break-word; color: #666;">${message}</p>
            </div>
            
            <p>If you have any urgent concerns, feel free to call us at <strong>+2347065810784</strong>.</p>
            
            <p style="margin-top: 30px;">
              Best regards,<br/>
              <strong>Anvictol Integrated Services Team</strong>
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">
              © 2025 Anvictol Integrated Services. All rights reserved.
            </p>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER || "ajumobiisaac96@gmail.com",
      to: from_email,
      subject: "We received your message - Anvictol Integrated Services",
      html: userConfirmationHtml,
    });

    return Response.json(
      { success: true, message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to send email. Please ensure EMAIL_PASSWORD is set in environment variables.",
      },
      { status: 500 }
    );
  }
}