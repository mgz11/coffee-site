import Hero from "@/components/Hero";
import db from "@/db/db";
import Image from "next/image";

async function getNewestProducts() {
	return db.product.findMany({
		where: { isAvailableForPurchase: true },
		orderBy: { updatedAt: "desc" },
		take: 5,
	});
}
export default function Homepage() {
	return (
		<>
			<Hero />
		</>
	);
}
