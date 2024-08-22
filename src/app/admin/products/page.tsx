import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/pageHeader";
import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
	ActiveToggleDropdownItem,
	DeleteDropdownItem,
} from "./_components/ProductActions";

export default function AdminProductsPage() {
	return (
		<>
			<div className="flex justify-between items-center gap-4">
				<PageHeader>Products</PageHeader>
				<Button asChild>
					<Link href="/admin/products/new">Add Product</Link>
				</Button>
			</div>
			<ProductsTable />
		</>
	);
}

async function ProductsTable() {
	// Get the individual products
	const products = await db.product.findMany({
		select: {
			id: true,
			name: true,
			priceInCents: true,
			isAvailableForPurchase: true,
		},
		orderBy: { name: "asc" },
	});

	// Get the quantities of each product ordered
	const productOrderQuantities = await db.orderItem.groupBy({
		by: ["productId"],
		_sum: {
			quantity: true,
		},
	});

	// Combine the individual product info with the quanity of each order
	const productsWithQuantities = products.map((product) => {
		const orderQuantity = productOrderQuantities.find(
			(item) => item.productId === product.id
		);
		return {
			...product,
			totalQuantityOrdered: orderQuantity?._sum.quantity || 0, // Default to 0 if no orders
		};
	});

	if (products.length === 0) return <p>No products found!</p>;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-0">
						<span className="sr-only">Available For Purchase</span>
					</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Price</TableHead>
					<TableHead>Orders</TableHead>
					<TableHead className="w-0">
						<span className="sr-only">Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{productsWithQuantities.map((product) => (
					<TableRow key={product.id}>
						<TableCell>
							{product.isAvailableForPurchase ? (
								<>
									<CheckCircle2 className="stroke-lime-600" />
									<span className="sr-only">Available</span>
								</>
							) : (
								<>
									<XCircle className="stroke-destructive" />
									<span className="sr-only">Unavailable</span>
								</>
							)}
						</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
						<TableCell>{formatNumber(product.totalQuantityOrdered)}</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<MoreVertical />
									<span className="sr-only">Actions</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem asChild>
										<Link href={`/admin/products/${product.id}/edit`}>
											Edit
										</Link>
									</DropdownMenuItem>
									<ActiveToggleDropdownItem
										id={product.id}
										isAvailableForPurchase={product.isAvailableForPurchase}
									/>
									<DropdownMenuSeparator />
									<DeleteDropdownItem
										id={product.id}
										disabled={product.totalQuantityOrdered > 0}
									/>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
