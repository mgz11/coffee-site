import db from "@/db/db";
import { PageHeader } from "../_components/pageHeader";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatters";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DeleteDropdownItem } from "./_components/OrderActions";

/**
 * Retrieves a list of orders from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of orders,
 * each containing the order's id, totalInCents, and items. The orders are
 * sorted by creation date in descending order.
 */
function getOrders() {
	return db.order.findMany({
		select: {
			id: true,
			totalInCents: true,
			createdAt: true,
			items: {
				select: {
					product: {
						select: {
							name: true,
						},
					},
					quantity: true,
				},
			},
		},
		orderBy: { createdAt: "desc" },
	});
}

export default function OrdersPage() {
	return (
		<>
			<PageHeader>Sales</PageHeader>
			<OrdersTable />
		</>
	);
}

async function OrdersTable() {
	const orders = await getOrders();

	if (orders.length === 0) {
		return <p>No Sales Found</p>;
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Order Date</TableHead>
					<TableHead>Order ID</TableHead>
					<TableHead>Order Items</TableHead>
					<TableHead>Price Paid</TableHead>
					<TableHead className="w-0">
						<span className="sr-only">Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order) => (
					<TableRow key={order.id}>
						<TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
						<TableCell>{order.id}</TableCell>
						<TableCell>
							{order.items.length > 0 ? (
								<ul>
									{order.items.map((item, index) => (
										<li key={index}>
											x{item.quantity} {item.product.name}
										</li>
									))}
								</ul>
							) : (
								"No items"
							)}
						</TableCell>
						<TableCell>{formatCurrency(order.totalInCents / 100)}</TableCell>
						<TableCell className="text-center">
							<DropdownMenu>
								<DropdownMenuTrigger>
									<MoreVertical />
									<span className="sr-only">Actions</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DeleteDropdownItem orderId={order.id} />
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
