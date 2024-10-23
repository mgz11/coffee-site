"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/legacy/image";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProductForm({ product }: { product?: Product | null }) {
	const [error, action] = useFormState(
		product == null ? addProduct : updateProduct.bind(null, product.id),
		{}
	);
	const [priceInCents, setPriceInCents] = useState<number | undefined>(
		product?.priceInCents
	);
	const [selectedProductType, setSelectedProductType] = useState<
		string | undefined
	>(product?.productType);

	const handleSelect = (type: string) => {
		setSelectedProductType(type);
	};

	return (
		<form action={action} className="space-y-8">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<Input
					type="text"
					id="name"
					name="name"
					required
					defaultValue={product?.name || ""}
				/>
				{error.name && <div className="text-destructive">{error.name}</div>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="productType">Product Type</Label>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Input
							type="text"
							id="productType"
							name="productType"
							value={selectedProductType}
							readOnly
							placeholder="Select a product type"
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuLabel>Product Types</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => handleSelect("Coffee")}>
							Coffee
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleSelect("Tea")}>
							Tea
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleSelect("Pastry")}>
							Pastry
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleSelect("Sandwich")}>
							Sandwich
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				{error.productType && (
					<div className="text-destructive">{error.productType}</div>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="priceInCents">Price In Cents</Label>
				<Input
					type="number"
					id="priceInCents"
					name="priceInCents"
					required
					value={priceInCents}
					onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
				/>
				<div className="text-muted-foreground">
					{formatCurrency((priceInCents || 0) / 100)}
				</div>
				{error.priceInCents && (
					<div className="text-destructive">{error.priceInCents}</div>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>
				<Textarea
					id="description"
					name="description"
					required
					defaultValue={product?.description}
				/>
				{error.description && (
					<div className="text-destructive">{error.description}</div>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="image">Image</Label>
				<Input type="file" id="image" name="image" required={product == null} />
				{product?.imageUrl != null && (
					<Image
						src={product.imageUrl}
						height="400"
						width="400"
						alt="Product image"
					/>
				)}
				{error.image && <div className="text-destructive">{error.image}</div>}
			</div>
			<SubmitButton />
		</form>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={pending}>
			{pending ? "Saving..." : "Save"}
		</Button>
	);
}
