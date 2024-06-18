import {
	CartActions,
	cartReducer,
	CartReducerState,
	initialCartState,
} from "@/reducers/cartReducer";

import { createContext, ReactNode, useMemo, useReducer } from "react";

interface CartProviderProps {
	children: ReactNode;
}

const CartContext = createContext<{
	state: CartReducerState;
	dispatch: React.Dispatch<CartActions>;
} | null>(null);

const CartProvider = ({ children }: CartProviderProps) => {
	const [state, dispatch] = useReducer(cartReducer, initialCartState);

	const value = useMemo(() => {
		return {
			state,
			dispatch,
		};
	}, [state, dispatch]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider, CartContext };
