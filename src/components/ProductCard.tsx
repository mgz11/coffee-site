"use client";

import { formatCurrency } from "@/lib/formatters";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/legacy/image";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

type ProductCardProps = {
	id: string;
	name: string;
	priceInCents: number;
	description: string;
	imageUrl: string | null;
};

export function ProductCard({
	id,
	name,
	priceInCents,
	description,
	imageUrl,
}: ProductCardProps) {
	const { addToCart } = useCart();
	const [loading, setLoading] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [showPopup, setShowPopup] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);

	const handleAddToCart = () => {
		const currentQuantity = quantity;
		addToCart({
			productId: id,
			name,
			priceInCents,
			imageUrl: imageUrl || undefined,
			quantity: currentQuantity,
		});

		setLoading(true);
		setShowPopup(true);
		setFadeOut(false);

		setTimeout(() => {
			setFadeOut(true);
		}, 500);

		// Disable popup after 2.5 seconds
		setTimeout(() => {
			setShowPopup(false);
			setLoading(false);
		}, 1500);
	};

	return (
		<Card className="flex overflow-hidden flex-col m-12 relative">
			<div className="relative w-full h-auto aspect-auto">
				{imageUrl ? (
					<div className="relative w-full h-auto aspect-video">
						<Image
							src={imageUrl}
							alt={name}
							layout="fill"
							className="object-contain"
						/>
					</div>
				) : (
					<div className="w-full aspect-video bg-gray-200" />
				)}
			</div>
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
			</CardHeader>
			<CardContent className="flex-grow">
				<p className="line-clamp-4">{description}</p>
				<div className="flex justify-center items-center space-x-4 mt-4">
					<Button
						size="sm"
						onClick={() => setQuantity((q) => (q > 1 ? q - 1 : q))}
						disabled={quantity <= 1}
					>
						-
					</Button>
					<span>{quantity}</span>
					<Button size="sm" onClick={() => setQuantity((q) => q + 1)}>
						+
					</Button>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					size="lg"
					className="w-full"
					onClick={handleAddToCart}
					disabled={loading}
				>
					{loading ? "Adding..." : "Add to Order"}
				</Button>
			</CardFooter>
			{showPopup && (
				<div
					className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded shadow-lg transition-opacity duration-1000 ${
						fadeOut ? "opacity-0" : "opacity-100"
					}`}
				>
					Added to Order!
				</div>
			)}
		</Card>
	);
}

// Used to display skeleton while loading products
export function ProductCardSkeleton() {
	return (
		<Card className="overflow-hidden flex flex-col animate-pulse">
			<div className="w-full aspect-video bg-gray-300" />
			<CardHeader>
				<CardTitle>
					<div className="w-3/4 h-6 rounded-full bg-gray-300" />
				</CardTitle>
				<CardDescription>
					<div className="w-1/2 h-4 rounded-full bg-gray-300" />
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="w-full h-4 rounded-full bg-gray-300" />
				<div className="w-full h-4 rounded-full bg-gray-300" />
				<div className="w-3/4 h-4 rounded-full bg-gray-300" />
			</CardContent>
			<CardFooter>
				<Button className="w-full" disabled size="lg"></Button>
			</CardFooter>
		</Card>
	);
}
