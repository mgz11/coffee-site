import { Nav, NavLink } from "@/components/Nav";

/*
This causes admin pages not to be cached since admin pages
should have the most up-to-date information available
 */
export const dynamic = "force-dynamic";

export default function CustomerLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Nav>
				<div className="flex-1 flex items-center p-4">
					<h1 className="text-3xl font-bold">Brand Name</h1>
				</div>
				<div className="flex-1 flex justify-center px-4">
					<NavLink href="/">Home</NavLink>
					<NavLink href="/about">About</NavLink>
					<NavLink href="/menu">Menu</NavLink>
				</div>
				<div className="flex-1 flex justify-end pr-4">
					<button className="relative">Checkout</button>
				</div>
			</Nav>
			<div>{children}</div>
		</>
	);
}
