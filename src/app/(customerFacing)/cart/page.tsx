"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/formatters";
import Link from "next/link";

export default function CartPage() {
	const { cart, removeFromCart, decreaseQuantity, increaseQuantity } =
		useCart();

	// Calculate the total amount from the cart
	const totalAmount = cart.reduce((acc, item) => {
		return acc + item.priceInCents * item.quantity;
	}, 0);

	return (
		<div className="p-12">
			<h1 className="text-3xl mb-8">Your Cart</h1>

			{/* Header Row */}
			<div className="grid grid-cols-4 gap-4 w-3/4 font-bold mb-4">
				<span>Item</span>
				<span>Price</span>
				<span>Quantity</span>
			</div>

			{/* Cart Items */}
			{cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				cart.map((item) => (
					<div
						key={item.name}
						className="grid grid-cols-4 gap-4 w-3/4 mb-4 items-center"
					>
						{/* Item Name */}
						<span>{item.name}</span>

						{/* Item Price */}
						<span>{formatCurrency(item.priceInCents / 100)}</span>

						{/* Quantity Controls */}
						<div className="flex items-center space-x-2 gap-4">
							<Button onClick={() => decreaseQuantity(item.productId)}>
								-
							</Button>
							<span className="w-6 text-center">{item.quantity}</span>
							<Button onClick={() => increaseQuantity(item.productId)}>
								+
							</Button>
						</div>

						{/* Actions */}
						<Button
							onClick={() => removeFromCart(item.productId)}
							className="px-4 py-2 w-1/2"
						>
							Remove
						</Button>
					</div>
				))
			)}

			{/* Divider */}
			<hr className="my-8 border-t-2 border-gray-300" />

			{/* Total Row */}
			<div>
				<span className="font-bold">Total: </span>
				<span>{formatCurrency(totalAmount / 100)}</span>
			</div>

			{/* Checkout Button */}
			<Link href="/checkout" replace>
				<Button className="mt-8" size="lg">
					Proceed to Checkout
				</Button>
			</Link>
		</div>
	);
}
