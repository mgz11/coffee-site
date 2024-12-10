import db from "@/db/db";
import { NextResponse } from "next/server";

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
		const groupedData = orders.reduce((acc, order) => {
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
