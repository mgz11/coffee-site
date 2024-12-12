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
			<Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
				{order.items.map((item) => (
					<Row key={item.id}>
						<Column>
							<Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
								{item.quantity} x
							</Text>
							<Text className="mt-0 mr-4">{item.productId}</Text>
						</Column>
						<Column>
							<Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
								Price
							</Text>
							<Text className="mt-0 mr-4">
								{formatCurrency(item.priceInCents / 100)}
							</Text>
						</Column>
					</Row>
				))}
			</Section>
		</>
	);
}
