import { NextResponse } from 'next/server';
import { sendWelcomeEmail, sendBookingConfirmationEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const { type, data } = await request.json();
    switch (type) {
      case 'welcome':
        await sendWelcomeEmail(data);
        break;
      case 'booking':
        await sendBookingConfirmationEmail(data);
        break;
      default:
        return NextResponse.json({ error: 'Unknown email type' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
