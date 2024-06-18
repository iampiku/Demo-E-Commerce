import routes from "@/router";

import { RouterProvider } from "react-router-dom";
import { CartProvider } from "@/context/CartContext.tsx";
function App() {
	return (
		<CartProvider>
			<RouterProvider router={routes} />;
		</CartProvider>
	);
}

export default App;
