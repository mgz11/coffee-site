import db from "@/db/db";
import { NextResponse } from "next/server";

/**
 * GET /api/sales
 *
 * Returns an array of objects, each with a `name` property set to the month
 * name (e.g., "Jan") and an `amount` property set to the total amount of money
 * generated in that month. The response is sorted by month. If there is no data
 * for a particular month, the `amount` property will be set to 0.
 *
 * Example response:
 * [
 *   { name: "Jan", amount: 100.0 },
 *   { name: "Feb", amount: 200.0 },
 *   { name: "Mar", amount: 0.0 },
 *   ...
 * ]
 *
 * If an error occurs while fetching the data, a 500 Internal Server Error
 * response will be returned with a JSON object containing the error message.
 */

export async function GET(request: Request) {
	try {
		// Fetch all orders
		const orders = await db.order.findMany({
			select: {
				createdAt: true,
				totalInCents: true,
			},
		});

		// Group orders by month and year
		const groupedData = orders.reduce<Record<string, number>>((acc, order) => {
			const date = new Date(order.createdAt);
			const month = date.toLocaleString("default", { month: "short" }); // e.g., "Jan"
			const year = date.getFullYear();
			const key = `${month} ${year}`;

			if (!acc[key]) {
				acc[key] = 0;
			}
			acc[key] += order.totalInCents / 100; // Convert cents to dollars
			return acc;
		}, {});

		// Generate all 12 months for the current year
		const currentYear = new Date().getFullYear();
		const allMonths = Array.from({ length: 12 }, (_, i) => {
			const date = new Date(currentYear, i);
			const month = date.toLocaleString("default", { month: "short" }); // e.g., "Jan"
			const key = `${month} ${currentYear}`;
			return {
				name: `${month}`,
				amount: groupedData[key] || 0, // Use grouped data or fallback to 0
			};
		});

		console.log("allMonths", allMonths);

		return NextResponse.json(allMonths);
	} catch (error) {
		console.error("Error fetching sales data:", error);

		// Return a 500 Internal Server Error response
		return NextResponse.json(
			{ error: "Failed to fetch sales data" },
			{ status: 500 }
		);
	}
}
