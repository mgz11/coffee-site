"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/formatters";
import Link from "next/link";

export default function CartPage() {
	const { cart, removeFromCart, decreaseQuantity, increaseQuantity } =
		useCart();

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
							<p>Quantity: {item.quantity}</p>
						</div>
						<div className="flex items-center space-x-4">
							<Button onClick={() => decreaseQuantity(item.productId)}>
								-
							</Button>
							<Button onClick={() => increaseQuantity(item.productId)}>
								+
							</Button>
							<Button onClick={() => removeFromCart(item.productId)}>
								Remove
							</Button>
						</div>
					</div>
				))
			)}
			<Link href="/checkout" replace>
				<Button className="mt-8" size="lg">
					Proceed to Checkout
				</Button>
			</Link>
		</div>
	);
}
