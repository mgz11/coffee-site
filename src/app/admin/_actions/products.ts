"use server";

import db from "../../../db/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
	(file) => file.size === 0 || file.type.startsWith("image/")
);

// Validation schema using Zod
const addSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	priceInCents: z.coerce.number().int().min(1),
	image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export async function addProduct(prevState: unknown, formData: FormData) {
	const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
	if (result.success === false) {
		return result.error.formErrors.fieldErrors;
	}

	const data = result.data;

	// Make a directory that will store product files that can be downloaded
	await fs.mkdir("public/products", { recursive: true });
	const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
	// Conver file to buffer and pass that to write file
	await fs.writeFile(
		`public${imagePath}`,
		Buffer.from(await data.image.arrayBuffer())
	);

	try {
		const createdProduct = await db.product.create({
			data: {
				isAvailableForPurchase: false,
				name: data.name,
				description: data.description,
				priceInCents: data.priceInCents,
				imageUrl: imagePath,
			},
		});

		// If the creation is successful, you can access the created object here
		console.log("Product created successfully:", createdProduct);
	} catch (err) {
		console.error(`Error creating product:`, err);
	}

	redirect("/admin/products");
}

const editSchema = addSchema.extend({
	image: imageSchema.optional(),
});

export async function updateProduct(
	id: string,
	prevState: unknown,
	formData: FormData
) {
	const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
	if (result.success === false) {
		return result.error.formErrors.fieldErrors;
	}

	const data = result.data;
	const product = await db.product.findUnique({ where: { id } });

	if (product === null) return notFound();

	// Defaults the image to whatever was there. If a new image is uploaded,
	// the current image will be unlinked and replaced
	let imagePath = product.imageUrl;
	if (data.image != null && data.image.size > 0) {
		await fs.unlink(`public${product.imageUrl}`);
		imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
		// Conver file to buffer and pass that to write file
		await fs.writeFile(
			`public${imagePath}`,
			Buffer.from(await data.image.arrayBuffer())
		);
	}

	try {
		const updatedProduct = await db.product.update({
			where: { id },
			data: {
				name: data.name,
				description: data.description,
				priceInCents: data.priceInCents,
				imageUrl: imagePath,
			},
		});

		console.log("Product updated successfully:", updatedProduct);
	} catch (err) {
		console.error(`Error updating product:`, err);
	}

	redirect("/admin/products");
}

export async function toggleProductAvailability(
	id: string,
	isAvailableForPurchase: boolean
) {
	await db.product.update({ where: { id }, data: { isAvailableForPurchase } });
}

export async function deleteProduct(id: string) {
	const product = await db.product.delete({ where: { id } });
	if (product === null) {
		return notFound();
	}

	// Delete image if product is deleted
	await fs.unlink(`public${product.imageUrl}`);
}
