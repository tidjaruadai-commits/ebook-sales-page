import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123');
const resend = new Resend(process.env.RESEND_API_KEY || 're_test_123');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_123';

export async function POST(request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Retrieve customer email from the session
    const customerEmail = session.customer_details?.email;

    if (customerEmail) {
      console.log(`Payment successful for ${customerEmail}. Sending ebook...`);
      
      try {
        await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: customerEmail,
          subject: 'Here is your ebook: Mastering Agentic AI',
          html: `
            <h1>Thank you for your purchase!</h1>
            <p>We hope you enjoy <strong>Mastering Agentic AI</strong>.</p>
            <p>You can download your copy using the secure link below:</p>
            <br/>
            <a href="https://example.com/download/mastering-agentic-ai.pdf" style="background:#3b82f6;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;">Download Ebook</a>
            <br/><br/>
            <p>Best regards,<br/>The Team</p>
          `,
        });
        console.log('Email sent successfully via Resend.');
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
