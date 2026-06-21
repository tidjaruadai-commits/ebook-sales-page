import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Use a placeholder secret if none provided for local dev
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123');

export async function POST(request) {
  try {
    // Determine the base URL for the success/cancel pages
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // If using the dummy key, bypass Stripe and simulate success for demo purposes
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_123') {
      console.log('Using dummy Stripe key. Bypassing Stripe and returning mock success URL.');
      return NextResponse.json({ url: `${origin}/?success=true` });
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'promptpay'],
      line_items: [
        {
          price_data: {
            currency: 'thb',
            product_data: {
              name: 'Mastering Agentic AI Ebook',
              description: 'The complete guide to building autonomous AI agents.',
              // images: [`${origin}/ebook-cover.png`],
            },
            unit_amount: 99000, // 990.00 THB
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe Checkout Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
