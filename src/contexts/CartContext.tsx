"use client";

import { createContext, useContext, useState } from "react";

interface CartItem {
	productId: string;
	name: string;
	priceInCents: number;
	imageUrl?: string;
	quantity: number;
}

interface CartContextProps {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (productId: string) => void;
	decreaseQuantity: (productId: string) => void;
	increaseQuantity: (productId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: React.PropsWithChildren<{}>) {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (item: CartItem) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(cartItem) => cartItem.productId === item.productId
			);
			if (existingItem) {
				return prevCart.map((cartItem) =>
					cartItem.productId === item.productId
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			} else {
				return [...prevCart, { ...item }];
			}
		});
	};

	const decreaseQuantity = (productId: string) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(cartItem) => cartItem.productId === productId
			);
			if (existingItem && existingItem.quantity > 1) {
				// Decrease quantity if more than 1 exists
				return prevCart.map((cartItem) =>
					cartItem.productId === productId
						? { ...cartItem, quantity: cartItem.quantity - 1 }
						: cartItem
				);
			} else {
				// Remove the item if its quantity becomes 0
				return prevCart.filter((cartItem) => cartItem.productId !== productId);
			}
		});
	};

	const increaseQuantity = (productId: string) => {
		setCart((prevCart) => {
			return prevCart.map((cartItem) =>
				cartItem.productId === productId
					? { ...cartItem, quantity: cartItem.quantity + 1 }
					: cartItem
			);
		});
	};

	const removeFromCart = (productId: string) => {
		setCart((prevCart) =>
			prevCart.filter((item) => item.productId !== productId)
		);
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
