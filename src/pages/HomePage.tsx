import NavBar from "@/components/Navbar";
import { Badge } from "@nextui-org/react";
import { LuShoppingCart } from "react-icons/lu";
import ProductCard from "@/components/ProductCard";
import ProductSkeletonLoader from "@/components/ProductSkeletonLoader";

import useCart from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import useNotification from "@/hooks/useNotification";

import { ProductDetails } from "@/types";

export default function Home() {
	const context = useCart();
	const { productState, isLoading } = useProducts(null);
	const { showNotification } = useNotification();

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

	const renderProduct = (product: ProductDetails) => {
		if (!context)
			return (
				<ProductCard
					key={product.id}
					productDetails={product}
					onAddProduct={onAddProduct}
				/>
			);
		return context.state.cartItems.some(({ id }) => id === product.id) ? (
			<Badge
				content={<LuShoppingCart className="text-base m-2" />}
				variant="shadow"
				color="secondary"
				className="absolute top-2 right-2"
				key={product.id}
			>
				<ProductCard productDetails={product} onAddProduct={onAddProduct} />
			</Badge>
		) : (
			<ProductCard
				key={product.id}
				productDetails={product}
				onAddProduct={onAddProduct}
			/>
		);
	};

	return (
		<>
			<NavBar />
			<main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-12">
				{isLoading &&
					Array.from({ length: 5 }).map((_, index) => {
						return <ProductSkeletonLoader key={index} />;
					})}
				{productState.products.map((product) => renderProduct(product))}
			</main>
		</>
	);
}
