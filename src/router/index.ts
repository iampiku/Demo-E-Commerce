import HomePage from "@/pages/HomePage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";

import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
	{
		path: "/",
		Component: HomePage,
	},
	{
		path: "/:productId",
		Component: ProductDetailsPage,
	},
]);

export default routes;
