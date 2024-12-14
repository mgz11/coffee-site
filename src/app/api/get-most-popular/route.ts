import db from "@/db/db";
import { NextResponse } from "next/server";

/**
 * GET /api/get-most-popular
 *
 * Returns an array of objects, each containing a product's details and the total
 * quantity sold of that product, sorted in descending order of total quantity
 * sold. If an error occurs, returns a 500 status code with an error message.
 *
 * Request:
 *
 * - none
 *
 * Response:
 *
 * - 200 OK: An array of objects, each containing a product's details and the
 *   total quantity sold of that product. The array is sorted in descending
 *   order of total quantity sold.
 * - 500 Internal Server Error: An object with a single property, "error",
 *   containing a string error message.
 */

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
