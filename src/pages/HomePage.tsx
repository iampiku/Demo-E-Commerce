import NavBar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import SortProducts from "@/components/SortProducts";
import FilterProducts from "@/components/FilterProducts";
import ProductSkeletonLoader from "@/components/ProductSkeletonLoader";

import useCart from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import useNotification from "@/hooks/useNotification";

import { ProductDetails } from "@/types";

export default function Home() {
	const context = useCart();

	const { showNotification } = useNotification();
	const { productState, isLoading } = useProducts(null);

	function onAddProduct(product: ProductDetails, quantity: number) {
		if (!context) return;
		context.dispatch({ type: "ADD_TO_CART", product, quantity });

		if (!showNotification) return;
		showNotification({
			type: "success",
			message: {
				title: `Item${quantity && quantity > 1 ? "s" : ""} Added to Cart!`,
				description: `You have successfully added ${product.title} to your cart.`,
			},
		});
	}

	return (
		<>
			<NavBar />
			<main className="px-12">
				<div className="flex gap-2 justify-between py-6">
					<FilterProducts />
					<SortProducts />
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 ">
					{isLoading &&
						Array.from({ length: 5 }).map((_, index) => {
							return <ProductSkeletonLoader key={index} />;
						})}
					{productState.products.map((product) => (
						<ProductCard
							key={product.id}
							productDetails={product}
							onAddProduct={onAddProduct}
						/>
					))}
				</div>
			</main>
		</>
	);
}
