import db from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const topProducts = await db.orderItem.groupBy({
			by: ["productId"],
			_sum: {
				quantity: true, // Sum the quantity for each product
			},
			orderBy: {
				_sum: {
					quantity: "desc", // Order by total quantity sold in descending order
				},
			},
			take: 5, // Limit to top 5 products
		});

		const detailedTopProducts = await Promise.all(
			topProducts.map(async (item) => {
				const product = await db.product.findUnique({
					where: { id: item.productId },
				});
				return {
					...product,
					totalSales: item._sum.quantity,
				};
			})
		);

		console.log(detailedTopProducts);
		return NextResponse.json(detailedTopProducts);
	} catch (error) {
		console.error("Error fetching top products:", error);
		return NextResponse.json(
			{ error: "Error fetching top products" },
			{ status: 500 }
		);
	}
}
