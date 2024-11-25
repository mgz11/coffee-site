import { NextResponse } from "next/server";
import Stripe from "stripe";
import db from "@/db/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

/**
 * Handles a POST request to process a successful payment intent and add an order to the database.
 *
 * The request body must include a `paymentIntentId` and `cart` with items.
 * It verifies the payment intent status and ensures the order has not been processed before.
 * If successful, it creates a new order with associated items in the database.
 *
 * @param {Request} request - The incoming request object containing the paymentIntentId and cart.
 * @returns {NextResponse} - A JSON response indicating the result of the operation, including the order ID if successful.
 */
export async function POST(request: Request) {
	try {
		const { paymentIntentId, cart } = await request.json();
		if (!paymentIntentId || !cart) {
			return NextResponse.json(
				{ message: "Invalid request body" },
				{ status: 400 }
			);
		}

		// Get payment intent to check if it is successful
		const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

		// Add order to database if successful payment
		if (paymentIntent.status === "succeeded") {
			const existingOrder = await db.order.findUnique({
				where: {
					paymentIntentId,
				},
			});
			if (existingOrder) {
				return NextResponse.json(
					{ error: "Order already processed" },
					{ status: 400 }
				);
			}

			// Create order in the databse
			const order = await db.order.create({
				data: {
					totalInCents: paymentIntent.amount,
					paymentIntentId,
					items: {
						create: cart.map((item: any) => ({
							productId: item.productId,
							quantity: item.quantity,
							priceInCents: item.priceInCents,
						})),
					},
				},
			});
			return NextResponse.json({ orderId: order.id });
		} else {
			return NextResponse.json({ message: "Payment failed" }, { status: 400 });
		}
	} catch (error) {
		console.error("Error adding order to database:", error);
		return NextResponse.json(
			{ message: "Error adding order to database" },
			{ status: 500 }
		);
	}
}
