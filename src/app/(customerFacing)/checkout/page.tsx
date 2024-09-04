"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/formatters";

export default function CheckoutPage() {
	const { cart, removeFromCart } = useCart();

	return (
		<div className="p-12">
			<h1 className="text-3xl mb-8">Your Cart</h1>
			{cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				cart.map((item) => (
					<div
						key={item.name}
						className="flex justify-between items-center mb-4"
					>
						<div>
							<h2>{item.name}</h2>
							<p>{formatCurrency(item.priceInCents / 100)}</p>
						</div>
						<Button onClick={() => removeFromCart(item.name)}>Remove</Button>
					</div>
				))
			)}
			<Button className="mt-8" size="lg">
				Proceed to Checkout
			</Button>
		</div>
	);
}
