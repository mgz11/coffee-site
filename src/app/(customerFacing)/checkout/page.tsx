// page.tsx
import dynamic from "next/dynamic";

// Dynamically import the CheckoutClient to ensure it only runs on the client side
const CheckoutClient = dynamic(
	() => import("./_components/CheckoutComponent"),
	{ ssr: false }
);

const CheckoutPage = () => {
	return (
		<div>
			<CheckoutClient />
		</div>
	);
};

export default CheckoutPage;

// import CheckoutContainer from "./_containers/CheckoutContainer";

// export default function CheckoutPage() {
// 	return <CheckoutContainer />;

// async function handleCheckout() {
//     try {
//         const newOrder = await db.order.create({
//             data: {
//                 userId: "test1",
//                 totalInCents: purchaseTotal,
//             }
//         });

//         const orderItems = cart.map((item) => ({
//             orderId: newOrder.id,
//             quantity: item.quantity,
//             priceInCents: item.priceInCents,
//             productId: item.productId,
//         }));

//         // Add all the order items to the db
//         await db.orderItem.createMany({ data: orderItems });

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: purchaseTotal,
//             currency: "USD",
//             metadata: { orderId: newOrder.id }
//         })

//         if (paymentIntent.client_secret == null) {
//             throw Error ("Stripe failed to create payment intent.")
//         }

//     } catch (error) {
//         console.error("Error during checkout: ", error);
//     }
// }

// return <CheckoutForm clientSecret={paymentIntent.client_secret}>;
//}
