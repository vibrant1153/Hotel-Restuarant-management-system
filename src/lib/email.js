import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendWelcomeEmail({ name, email }) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to Auralis — Where Luxury Meets You',
    html: `
      <div style="font-family: Georgia, serif; background: #0B1E3A; color: #F8F9FB; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #D4AF37; font-size: 32px; margin: 0; letter-spacing: 4px;">AURALIS</h1>
          <p style="color: #A0A7B5; font-size: 12px; letter-spacing: 2px; margin-top: 4px;">LUXURY HOTEL & RESORT</p>
        </div>
        <h2 style="color: #F8F9FB;">Welcome, ${name}!</h2>
        <p style="color: #A0A7B5; line-height: 1.8;">
          We are delighted to welcome you to the Auralis family. Your account has been created and you now have access to our world-class amenities and personalized services.
        </p>
        <div style="background: rgba(212,175,55,0.1); border-left: 4px solid #D4AF37; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
          <p style="color: #D4AF37; margin: 0; font-style: italic;">
            "Excellence is not a destination but a continuous journey that never ends."
          </p>
        </div>
        <p style="color: #A0A7B5;">Visit us at <a href="${process.env.NEXTAUTH_URL}" style="color: #D4AF37;">Auralis Hotel</a></p>
        <hr style="border-color: rgba(160,167,181,0.2); margin: 32px 0;" />
        <p style="color: #A0A7B5; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} Auralis Hotel & Resort. All rights reserved.</p>
      </div>
    `,
  });
}

export async function sendBookingConfirmationEmail({ name, email, booking }) {
  // Stub — user will complete booking engine integration
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Auralis — Booking Confirmation #${booking?.id?.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="font-family: Georgia, serif; background: #0B1E3A; color: #F8F9FB; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D4AF37; letter-spacing: 4px;">AURALIS</h1>
        <h2>Booking Confirmed, ${name}!</h2>
        <p style="color: #A0A7B5;">Your booking reference: <strong style="color: #D4AF37;">#${booking?.id?.slice(0, 8).toUpperCase()}</strong></p>
        <p style="color: #A0A7B5;">We look forward to welcoming you.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail({ email, resetUrl }) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Auralis — Password Reset Request',
    html: `
      <div style="font-family: Georgia, serif; background: #0B1E3A; color: #F8F9FB; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D4AF37; letter-spacing: 4px;">AURALIS</h1>
        <h2>Password Reset</h2>
        <p style="color: #A0A7B5;">You requested a password reset. Click the button below to set a new password:</p>
        <a href="${resetUrl}" style="display: inline-block; background: #D4AF37; color: #0B1E3A; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">Reset Password</a>
        <p style="color: #A0A7B5; font-size: 12px;">This link expires in 1 hour. If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
}
