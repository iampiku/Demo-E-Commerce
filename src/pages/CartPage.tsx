import NavBar from "@/components/Navbar";

import CartGrid from "@/components/CartGrid";
import useCart from "@/hooks/useCart";
import { ProductDetails } from "@/types";

export default function CartPage() {
	const cartContext = useCart();
	const onQuantityUpdate = (
		actionType: "increment" | "decrement",
		product: ProductDetails
	) => {
		if (!cartContext) return;
		if (actionType === "increment")
			cartContext.dispatch({ type: "ADD_TO_CART", product });
		else
			cartContext.dispatch({ type: "REMOVE_FROM_CART", productId: product.id });
	};

	const handleCartClear = () => {
		if (!cartContext) return;
		cartContext.dispatch({ type: "CLEAR_CART" });
	};

	return (
		<>
			<NavBar />
			<CartGrid
				handleCartClear={handleCartClear}
				handleQuantityChange={onQuantityUpdate}
				productList={cartContext?.state.cartItems ?? []}
			/>
		</>
	);
}
