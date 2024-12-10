import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Overview } from "./_components/overview";
import { PopularItems } from "./_components/popularItems";

async function getSalesData() {
	const data = await db.order.aggregate({
		_sum: { totalInCents: true },
		_count: true,
	});

	// Return sales in dollars and number of orders
	return {
		amount: (data._sum.totalInCents || 0) / 100,
		numberOfSales: data._count,
	};
}

// async function getUserData() {
// 	const [userCount, orderData] = await Promise.all([
// 		db.user.count(),
// 		db.order.aggregate({
// 			_sum: { totalInCents: true },
// 		}),
// 	]);

// 	return {
// 		userCount,
// 		averageValuePerUser:
// 			userCount === 0
// 				? 0
// 				: (orderData._sum.totalInCents || 0) / userCount / 100,
// 	};
// }

async function getProductData() {
	const [activeCount, inactiveCount] = await Promise.all([
		await db.product.count({ where: { isAvailableForPurchase: true } }),
		await db.product.count({ where: { isAvailableForPurchase: false } }),
	]);

	return {
		activeCount,
		inactiveCount,
	};
}

export default async function AdminDashboard() {
	const [salesData, productData] = await Promise.all([
		getSalesData(),
		getProductData(),
	]);

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
				<DashboardCard
					title="Sales"
					subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
					body={formatCurrency(salesData.amount)}
				/>
				<DashboardCard
					title="Active Products"
					subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
					body={formatNumber(productData.activeCount)}
				/>
				<Card className="lg:col-span-3">
					<CardHeader>
						<CardTitle>
							Monthly Sales Overview ({new Date().getFullYear()})
						</CardTitle>
					</CardHeader>
					<CardContent className="pl-2">
						<Overview />
					</CardContent>
				</Card>
				<Card className="lg:col-span-1">
					<CardHeader>
						<CardTitle>Popular Items</CardTitle>
					</CardHeader>
					<CardContent>
						<PopularItems />
					</CardContent>
				</Card>
			</div>
		</>
	);
}

type DashboardCardProps = {
	title: string;
	subtitle: string;
	body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{subtitle}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{body}</p>
			</CardContent>
		</Card>
	);
}
