"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";

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

export async function addProduct(formData: FormData) {
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

	db.product.create({
		data: {
			name: data.name,
			description: data.description,
			priceInCents: data.priceInCents,
			imageUrl: imagePath,
		},
	});

	redirect("/admin/products");
}
