"use client";

import { createContext, useContext, useState } from "react";

interface CartItem {
	name: string;
	priceInCents: number;
	imageUrl?: string;
}

interface CartContextProps {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (itemName: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: React.PropsWithChildren<{}>) {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (item: CartItem) => {
		setCart((prevCart) => [...prevCart, item]);
	};

	const removeFromCart = (itemName: string) => {
		setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
	};

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}

	return context;
}
