import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import db from "@/db/db";
import { Suspense } from "react";

async function getProductsByType() {
	const products = await db.product.findMany({
		where: { isAvailableForPurchase: true },
	});

	// Group products by productType
	return products.reduce((acc, product) => {
		const { productType } = product;
		if (!acc[productType]) {
			acc[productType] = [];
		}
		acc[productType].push(product);
		return acc;
	}, {} as Record<string, typeof products>);
}

export default function MenuPage() {
	return (
		<div className="space-y-8">
			<Suspense
				fallback={
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
					</div>
				}
			>
				<ProductsSuspense />
			</Suspense>
		</div>
	);
}

async function ProductsSuspense() {
	const productsByType = await getProductsByType();
	const productTypeOrder = ["Coffee", "Tea", "Pastry", "Sandwich"];

	return (
		<>
			{productTypeOrder.map((type) => (
				<div key={type}>
					<h2 className="text-2xl font-bold mt-12 ml-12">{type}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{productsByType[type] && productsByType[type].length > 0 ? (
							productsByType[type].map((product) => (
								<ProductCard key={product.id} {...product} />
							))
						) : (
							<p className="col-span-full text-gray-500 ml-12 mb-12">
								No items available
							</p>
						)}
					</div>
				</div>
			))}
		</>
	);
}
