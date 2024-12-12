import { Nav, NavLink } from "@/components/Nav";
import Image from "next/image";

/*
This causes admin pages not to be cached since admin pages
should have the most up-to-date information available
 */
export const dynamic = "force-dynamic";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Nav>
				<div className="flex-1 flex items-center p-4 relative">
					<div className="absolute top-1/2 transform -translate-y-1/2 left-4 flex items-center space-x-2">
						<Image
							src="/assets/logo.png"
							alt="logo"
							width={100} // Restrict width
							height={100} // Restrict height
							className="object-contain"
						/>
					</div>
				</div>
				<div className="flex justify-center">
					<NavLink href="/admin">Dashboard</NavLink>
					<NavLink href="/admin/products">Products</NavLink>
					<NavLink href="/admin/orders">Sales</NavLink>
				</div>
				<div className="flex-1"></div>
			</Nav>
			<div className="container my-6">{children}</div>
		</>
	);
}
