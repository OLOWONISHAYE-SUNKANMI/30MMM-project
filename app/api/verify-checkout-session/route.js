import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return Response.json(
        { error: "Session ID is required" },
        { status: 400 },
      );
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if payment was successful
    if (session.payment_status === "paid") {
      // TODO: Update user's premium status in your database here
      // Example:
      // await updateUserPremiumStatus(session.customer_email, true);

      console.log("Payment successful for:", session.customer_email);
      console.log("Amount paid:", session.amount_total);
      console.log("Metadata:", session.metadata);

      return Response.json({
        success: true,
        verified: true,
        customerEmail: session.customer_email,
        amountPaid: session.amount_total,
        metadata: session.metadata,
      });
    } else {
      return Response.json({
        success: false,
        verified: false,
        message: "Payment not completed",
      });
    }
  } catch (error) {
    console.error("Session verification error:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return Response.json(
        { error: `Stripe error: ${error.message}` },
        { status: 400 },
      );
    }

    return Response.json(
      { error: "Failed to verify session" },
      { status: 500 },
    );
  }
}
