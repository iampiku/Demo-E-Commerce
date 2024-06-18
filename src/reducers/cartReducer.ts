import { CartItem, ProductDetails } from "@/types";

export type CartReducerState = {
	cartItems: CartItem[];
};
export type CartActions =
	| { type: "ADD_TO_CART"; product: ProductDetails; quantity?: number }
	| { type: "REMOVE_FROM_CART"; productId: number }
	| { type: "CLEAR_CART" };

export const initialCartState = {
	cartItems: [],
};

function handleAddCart(
	state: CartReducerState,
	action: { type: "ADD_TO_CART"; product: ProductDetails; quantity?: number }
) {
	const { product, quantity = 1 } = action;

	const existingProduct =
		state.cartItems.find((item) => item.id === product.id) ?? null;

	if (existingProduct) {
		const totalProductCount = existingProduct.quantity + quantity;
		const updatedProductItem = {
			...existingProduct,
			quantity: totalProductCount,
			totalPrice: totalProductCount * existingProduct.price,
		};

		return {
			cartItems: state.cartItems.map((item) =>
				item.id === action.product.id ? updatedProductItem : item
			),
		};
	} else {
		const newProduct = {
			...product,
			quantity,
			totalPrice: product.price * quantity,
		};

		return {
			cartItems: [...state.cartItems, newProduct],
		};
	}
}

function handleRemoveCart(
	state: CartReducerState,
	action: { type: "REMOVE_FROM_CART"; productId: number }
) {
	const { productId } = action;

	const isProductPresent =
		state.cartItems.find(({ id }) => id === productId) ?? null;

	if (!isProductPresent) return state;

	const updatedProductItem = {
		...isProductPresent,
		quantity: isProductPresent.quantity - 1,
		totalPrice: (isProductPresent.quantity - 1) * isProductPresent.price,
	};

	return {
		cartItems:
			updatedProductItem.quantity > 0
				? state.cartItems.map((item) =>
						item.id === productId ? updatedProductItem : item
				  )
				: state.cartItems.filter((item) => item.id !== productId),
	};
}

export function cartReducer(state: CartReducerState, action: CartActions) {
	switch (action.type) {
		case "ADD_TO_CART":
			return handleAddCart(state, action);
		case "REMOVE_FROM_CART":
			return handleRemoveCart(state, action);
		case "CLEAR_CART":
			return {
				...state,
				cartItems: [],
			};
		default:
			return state;
	}
}
