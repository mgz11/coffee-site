"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
	// const searchParams = useSearchParams();
	// const orderId = searchParams.get("orderId");

	// const orderNumber =
	// 	typeof orderId === "string" ? orderId.substring(0, 8) : null;

	return (
		<div className="container mx-auto px-4 py-8">
			<Card className="max-w-2xl mx-auto">
				<CardHeader className="text-center">
					<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
					<CardTitle className="text-3xl font-bold">Order Confirmed!</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="text-center text-muted-foreground">
						<p>Thank you for your purchase.</p>
						<p>Check your email for details about your order.</p>
					</div>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Link href="/">
						<Button>Return to Home</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
