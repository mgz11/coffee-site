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
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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

	return (
		<form>
			<Card>
				<CardHeader>
					<CardTitle>Checkout</CardTitle>
					<CardDescription className="text-destructive">Error</CardDescription>
				</CardHeader>
				<CardContent>
					<PaymentElement />
				</CardContent>
				<CardFooter>
					<Button
						className="w-full"
						size="lg"
						disabled={stripe == null || elements == null}
					>
						Submit Order - {formatCurrency(totalAmountInCents / 100)}
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
