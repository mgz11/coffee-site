import { Nav, NavLink } from "@/components/Nav";
import Link from "next/link";
import React from "react";
import Image from "next/image";
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
				<div className="flex-1 flex justify-center items-center text-lg">
					<NavLink href="/">Home</NavLink>
					<NavLink href="/about">About</NavLink>
					<NavLink href="/menu">Menu</NavLink>
				</div>
				<div className="flex-1 flex justify-end items-center pr-4 text-lg">
					<Link href="/cart">
						<button className="relative">View Cart</button>
					</Link>
				</div>
			</Nav>
			<div>{children}</div>
		</>
	);
}
