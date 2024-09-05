"use client";

import { createContext, useContext, useState } from "react";

interface CartItem {
	name: string;
	priceInCents: number;
	imageUrl?: string;
	quantity: number;
}

interface CartContextProps {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (itemName: string) => void;
	decreaseQuantity: (item: string) => void;
	increaseQuantity: (item: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: React.PropsWithChildren<{}>) {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (item: Omit<CartItem, "quantity">) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(cartItem) => cartItem.name === item.name
			);
			if (existingItem) {
				return prevCart.map((cartItem) =>
					cartItem.name === item.name
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			} else {
				return [...prevCart, { ...item, quantity: 1 }];
			}
		});
	};

	const decreaseQuantity = (itemName: string) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(cartItem) => cartItem.name === itemName
			);
			if (existingItem && existingItem.quantity > 1) {
				// Decrease quantity if more than 1 exists
				return prevCart.map((cartItem) =>
					cartItem.name === itemName
						? { ...cartItem, quantity: cartItem.quantity - 1 }
						: cartItem
				);
			} else {
				// Remove the item if its quantity becomes 0
				return prevCart.filter((cartItem) => cartItem.name !== itemName);
			}
		});
	};

	const increaseQuantity = (itemName: string) => {
		setCart((prevCart) => {
			return prevCart.map((cartItem) =>
				cartItem.name === itemName
					? { ...cartItem, quantity: cartItem.quantity + 1 }
					: cartItem
			);
		});
	};

	const removeFromCart = (itemName: string) => {
		setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				decreaseQuantity,
				increaseQuantity,
			}}
		>
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
