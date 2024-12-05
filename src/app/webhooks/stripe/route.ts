import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
	const event = await stripe.webhooks.constructEvent(
		await request.text(),
		request.headers.get("stripe-signature") as string,
		process.env.STRIPE_WEBHOOK_SECRET as string
	);

	if (event.type === "charge.succeeded") {
		const charge = event.data.object;
		const email = charge.billing_details.email;
		const pricePaidInCents = charge.amount;
		const paymentIntentId = charge.payment_intent;

		// Ensure paymentIntent is a string
		if (typeof paymentIntentId !== "string") {
			console.error("PaymentIntentId is not a valid string:", paymentIntentId);
			return NextResponse.json(
				{ error: "Invalid PaymentIntentId" },
				{ status: 400 }
			);
		}

		let items: any[] = [];

		// Get payment intent to get the metadata (items)
		try {
			const paymentIntent = await stripe.paymentIntents.retrieve(
				paymentIntentId
			);
			items = paymentIntent.metadata?.items
				? JSON.parse(paymentIntent.metadata.items)
				: [];
		} catch (error) {
			console.error("Error retrieving payment intent:", error);
			return NextResponse.json(
				{ error: "Error retrieving payment intent" },
				{ status: 400 }
			);
		}

		try {
			// Check if order already exists
			const existingOrder = await db.order.findUnique({
				where: {
					paymentIntentId,
				},
			});

			// If the order already exists, return an error
			if (existingOrder) {
				return NextResponse.json(
					{ error: "Order already processed" },
					{ status: 200 }
				);
			}

			// Add order to database
			const order = await db.order.create({
				data: {
					totalInCents: pricePaidInCents,
					paymentIntentId,
					items: {
						create: items.map((item: any) => ({
							productId: item.productId,
							quantity: item.quantity,
							priceInCents: item.priceInCents,
						})),
					},
				},
			});
			return NextResponse.json({ orderId: order.id }, { status: 200 });
		} catch (error) {
			console.error("Error saving order to database:", error);
			return NextResponse.json(
				{ error: "Error saving order to database" },
				{ status: 500 }
			);
		}
	} else {
		return NextResponse.json({ message: "Event not handled" }, { status: 400 });
	}
}
