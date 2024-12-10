import db from "@/db/db";
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

		/*Cross reference db and create the payment intent using amounts from db instead of client */
		const productIds = items.map(
			(item: { productId: string }) => item.productId
		);
		const products = await db.product.findMany({
			where: {
				id: {
					in: productIds,
				},
				isAvailableForPurchase: true,
			},
		});

		let totalAmount = 0;
		for (const item of items) {
			const product = products.find((p) => p.id === item.productId);

			if (!product) {
				return NextResponse.json(
					{ message: `Product not found: ${item.productId}` },
					{ status: 400 }
				);
			}

			const productTotal = product.priceInCents * item.quantity;
			totalAmount += productTotal;
		}

		if (totalAmount !== amount) {
			return NextResponse.json(
				{
					message:
						"Price discrepancy detected. Please refresh your cart and try again.",
					recalculatedTotal: totalAmount,
				},
				{ status: 400 }
			);
		}

		const paymentIntent = await stripe.paymentIntents.create({
			amount: totalAmount,
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
