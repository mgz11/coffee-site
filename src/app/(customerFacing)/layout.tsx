import { Nav, NavLink } from "@/components/Nav";
import Link from "next/link";
import React from "react";

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
					<h1 className="text-2xl font-bold">Brand Name</h1>
				</div>
				<div className="flex-1 flex justify-center items-center">
					<NavLink href="/">Home</NavLink>
					<NavLink href="/about">About</NavLink>
					<NavLink href="/menu">Menu</NavLink>
				</div>
				<div className="flex-1 flex justify-end items-center pr-4">
					<Link href="/cart">
						<button className="relative">View Cart</button>
					</Link>
				</div>
			</Nav>
			<div>{children}</div>
		</>
	);
}
