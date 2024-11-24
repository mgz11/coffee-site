"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import {
	Elements,
	LinkAuthenticationElement,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
type CheckoutFormProps = {
	totalAmountInCents: number;
	clientSecret: string;
};

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function CheckoutForm({
	totalAmountInCents,
	clientSecret,
}: CheckoutFormProps) {
	return (
		<>
			<div className="max-w-5xl w-full m-auto space-y-8 mt-8">
				<Elements options={{ clientSecret }} stripe={stripePromise}>
					<Form totalAmountInCents={totalAmountInCents} />
				</Elements>
			</div>
		</>
	);
}

function Form({ totalAmountInCents }: { totalAmountInCents: number }) {
	// Create instance of Stripe and hook up elements to it
	const stripe = useStripe();
	const elements = useElements();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (stripe == null || elements == null) {
			return;
		}

		setIsLoading(true);

		// Confirm Stripe payment
		stripe
			.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
				},
			})
			.then(({ error }) => {
				if (error.type === "card_error" || error.type === "validation_error") {
					setErrorMessage(error.message);
				} else {
					setErrorMessage("An unexpected error occurred.");
				}
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>Checkout</CardTitle>
					{errorMessage && (
						<CardDescription className="text-destructive">
							{errorMessage}
						</CardDescription>
					)}
				</CardHeader>
				<CardContent>
					<PaymentElement />
					<div className="mt-4">
						<LinkAuthenticationElement />
					</div>
				</CardContent>
				<CardFooter>
					<Button
						className="w-full"
						size="lg"
						disabled={stripe == null || elements == null || isLoading}
					>
						{isLoading
							? "Submitting Order..."
							: `Submit Order - ${formatCurrency(totalAmountInCents / 100)}`}
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
