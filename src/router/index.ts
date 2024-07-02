import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
	{
		path: "/",
		Component: HomePage,
	},
	{
		path: "product/:productId",
		async lazy() {
			const { default: Component } = await import("@/pages/ProductDetailsPage");
			return { Component };
		},
	},
	{
		path: "/cart",
		async lazy() {
			const { default: Component } = await import("@/pages/CartPage");
			return { Component };
		},
	},
]);

export default routes;
