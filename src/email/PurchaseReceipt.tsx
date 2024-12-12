import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Tailwind,
} from "@react-email/components";
import { OrderInfo } from "./components/OrderInfo";

type PurchaseReceiptEmailProps = {
	order: {
		createdAt: Date;
		orderNumber: string;
		pricePaidInCents: number;
		items: {
			id: number;
			orderId: string;
			productId: string;
			quantity: number;
			priceInCents: number;
		}[];
	};
};

PurchaseReceiptEmail.PreviewProps = {
	order: {
		createdAt: new Date(),
		orderNumber: "123456789",
		pricePaidInCents: 1000,
		items: [
			{
				id: 1,
				orderId: "123456789",
				productId: "123456789",
				quantity: 1,
				priceInCents: 1000,
			},
			{
				id: 2,
				orderId: "123456789",
				productId: "987654321",
				quantity: 2,
				priceInCents: 2000,
			},
		],
	},
};

export default function PurchaseReceiptEmail({
	order,
}: PurchaseReceiptEmailProps) {
	return (
		<Html>
			<Preview>Your order has been confirmed. View recipt</Preview>
			<Tailwind>
				<Head />
				<Body className="font-sans bg-white">
					<Container className="max-w-xl">
						<Heading>Purchase Receipt</Heading>
						<OrderInfo order={order} />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
