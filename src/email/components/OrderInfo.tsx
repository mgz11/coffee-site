import { formatCurrency } from "@/lib/formatters";
import { Column, Img, Row, Section, Text } from "@react-email/components";

type OrderInfoProps = {
	order: {
		createdAt: Date;
		orderNumber: string;
		pricePaidInCents: number;
		items: {
			id: number;
			orderId: string;
			productId: string;
			productName: string;
			quantity: number;
			priceInCents: number;
		}[];
	};
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	dateStyle: "medium",
});

export function OrderInfo({ order }: OrderInfoProps) {
	return (
		<>
			<Section>
				<Row>
					<Column>
						<Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
							Order Number
						</Text>
						<Text className="mt-0 mr-4">#{order.orderNumber}</Text>
					</Column>
					<Column>
						<Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
							Purchased On
						</Text>
						<Text className="mt-0 mr-4">
							{dateFormatter.format(order.createdAt)}
						</Text>
					</Column>
					<Column>
						<Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
							Price Paid
						</Text>
						<Text className="mt-0 mr-4">
							{formatCurrency(order.pricePaidInCents / 100)}
						</Text>
					</Column>
				</Row>
			</Section>
			<Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4 max-w-2xl mx-auto">
				<Row>
					<Column className="w-2/3">
						{" "}
						<Text className="mb-0 text-gray-500 whitespace-nowrap">
							Product
						</Text>
					</Column>
					<Column className="w-1/3 text-right">
						{" "}
						<Text className="mb-0 text-gray-500 whitespace-nowrap">Price</Text>
					</Column>
				</Row>
				{order.items.map((item) => (
					<Row key={item.id}>
						<Column className="w-2/3">
							{" "}
							<Text>
								{item.quantity} x {item.productName}
							</Text>
						</Column>
						<Column className="w-1/3 text-right">
							{" "}
							<Text>
								{formatCurrency((item.priceInCents * item.quantity) / 100)}
							</Text>
						</Column>
					</Row>
				))}
			</Section>
		</>
	);
}
