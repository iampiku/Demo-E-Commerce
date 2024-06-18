import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export default function useCart() {
	const cartContext = useContext(CartContext);
	return cartContext;
}
