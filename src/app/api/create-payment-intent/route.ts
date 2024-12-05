import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
	try {
		const { amount, items } = await request.json();

		if (!amount || !items) {
			return NextResponse.json(
				{ message: "Invalid request body" },
				{ status: 400 }
			);
		}

		const metadataItems = items.map(
			(item: {
				productId: string;
				priceInCents: number;
				quantity: number;
			}) => ({
				productId: item.productId,
				priceInCents: item.priceInCents,
				quantity: item.quantity,
			})
		);

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			metadata: { items: JSON.stringify(metadataItems) },
		});

		return NextResponse.json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		console.error("Error creating payment intent:", error);
		return NextResponse.json(
			{ message: "Error creating payment intent" },
			{ status: 500 }
		);
	}
}
