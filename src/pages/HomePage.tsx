import ProductCard from "@/components/ProductCard";

import useProducts from "@/hooks/useProducts";

export default function Home() {
	const { products } = useProducts(null);

	const productList = products && Array.isArray(products) ? products : [];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-12">
			{productList.map((product) => (
				<ProductCard productDetails={product} key={product.id} />
			))}
		</div>
	);
}
