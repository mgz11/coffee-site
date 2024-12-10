"use client";

import { useState, useEffect } from "react";
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export function Overview() {
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchSalesData() {
			try {
				const response = await fetch("/api/sales");
				const result = await response.json();
				setData(result);
			} catch (error) {
				console.error("Error fetching sales data:", error);
			}
		}

		fetchSalesData();
	}, []);

	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={data}>
				<XAxis
					dataKey="name"
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					interval={0}
				/>
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `$${value}`}
				/>
				<Tooltip
					formatter={(value) => [`$${value}`, "Sales"]}
					labelFormatter={(label) => `Month: ${label}`}
				/>
				<Bar dataKey="amount" fill="#adfa1d" radius={[4, 4, 0, 0]} />
			</BarChart>
		</ResponsiveContainer>
	);
}
