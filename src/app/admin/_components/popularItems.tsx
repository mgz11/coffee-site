"use client";
import { use, useEffect, useState } from "react";
import { Star, ShoppingCart, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PopularItem {
	id: number;
	name: string;
	category: string;
	price: number;
	rating: number;
	sales: number;
}

export function PopularItems() {
	const [popularItems, setPopularItems] = useState<PopularItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		// Fetch popular items from the API
		const fetchPopularItems = async () => {
			try {
				const response = await fetch("/api/get-most-popular");
				const data = await response.json();
				const formattedData = data.map((item: any) => ({
					id: item.id,
					name: item.name,
					category: item.productType,
					price: item.priceInCents / 100, // Convert cents to dollars
					rating: Math.random() * 1 + 4, // Mock rating for now
					sales: item.totalSales,
				}));
				setPopularItems(formattedData);
			} catch (error) {
				console.error("Error fetching popular items:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPopularItems();
	}, []);

	if (loading) {
		return <p>Loading popular items...</p>;
	}

	return (
		<div className="space-y-4">
			{popularItems.map((item) => (
				<Card key={item.id}>
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-semibold">{item.name}</h3>
								<p className="text-sm text-muted-foreground">{item.category}</p>
							</div>
							<Badge variant="secondary">${item.price.toFixed(2)}</Badge>
						</div>
						<div className="mt-2 flex items-center justify-between text-sm">
							<div className="flex items-center">
								<Star className="mr-1 h-4 w-4 text-yellow-400" />
								<span>{item.rating.toFixed(1)}</span>
							</div>
							<div className="flex items-center">
								<ShoppingCart className="mr-1 h-4 w-4 text-green-500" />
								<span>{item.sales} sold</span>
							</div>
							<div className="flex items-center">
								<TrendingUp className="mr-1 h-4 w-4 text-blue-500" />
								<span>Popular</span>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
