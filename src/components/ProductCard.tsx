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
import Image from "next/image";

type ProductCardProps = {
	id: string;
	name: string;
	priceInCents: number;
	description: string;
	imageUrl: string | null;
};

export function ProductCard({
	name,
	priceInCents,
	description,
	imageUrl,
}: ProductCardProps) {
	return (
		<Card className="flex overflow-hidden flex-col m-12">
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
			</CardContent>
			<CardFooter>
				<Button size="lg" className="w-full">
					Add to Order
				</Button>
			</CardFooter>
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
