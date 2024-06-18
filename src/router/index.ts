import CartPage from "@/pages/CartPage";
import HomePage from "@/pages/HomePage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";

import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
	{
		path: "/",
		Component: HomePage,
	},
	{
		path: "product/:productId",
		Component: ProductDetailsPage,
	},
	{
		path: "/cart",
		Component: CartPage,
	},
]);

export default routes;
