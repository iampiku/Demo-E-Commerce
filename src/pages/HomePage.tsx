import ProductCard from "@/components/ProductCard";
import NavBar from "@/components/Navbar";

import useProducts from "@/hooks/useProducts";
import { ProductDetails } from "@/types";

import useCart from "@/hooks/useCart";

export default function Home() {
	const { productState } = useProducts(null);
	const context = useCart();

	function onAddProduct(product: ProductDetails, quantity: number) {
		if (!context) return;
		context.dispatch({ type: "ADD_TO_CART", product, quantity });
	}

	return (
		<>
			<NavBar />
			<main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-12">
				{productState.products.map((product) => (
					<ProductCard
						key={product.id}
						productDetails={product}
						onAddProduct={onAddProduct}
					/>
				))}
			</main>
		</>
	);
}
