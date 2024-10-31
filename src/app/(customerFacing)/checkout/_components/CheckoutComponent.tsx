"use client";

import { useContext, useEffect, useState } from "react";
import { CheckoutForm } from "./CheckoutForm";
import { useCart } from "@/contexts/CartContext";

const CheckoutComponent = () => {
	const { cart } = useCart();
	const [clientSecret, setClientSecret] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	// Calculate the total amount from the cart
	const totalAmount = cart.reduce((acc, item) => {
		return acc + item.priceInCents * item.quantity;
	}, 0);

	// Create payment intent on page load
	useEffect(() => {
		const createPaymentIntent = async () => {
			try {
				const response = await fetch("/api/create-payment-intent", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ amount: totalAmount, items: cart }),
				});

				const clientSecret = await response.json();
				console.log("clientSecret", clientSecret.clientSecret);
				setClientSecret(clientSecret.clientSecret);
			} catch (error) {
				console.error("Error creating payment intent:", error);
			} finally {
				setLoading(false);
			}
		};

		if (cart.length > 0) createPaymentIntent();
		else setLoading(false);
	}, [totalAmount, cart]);

	if (loading) return <p>Loading checkout...</p>;

	if (!clientSecret) return <p>Error creating payment intent</p>;

	return (
		<CheckoutForm
			totalAmountInCents={totalAmount}
			clientSecret={clientSecret}
		/>
	);
};

export default CheckoutComponent;
