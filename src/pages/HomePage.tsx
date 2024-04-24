import axios from "axios";

import { useEffect, useState } from "react";

import { ProductDetails } from "@/types";

import ProductCard from "@/components/ProductCard";

export default function Home() {
	const [products, setProducts] = useState<ProductDetails[]>([]);

	useEffect(() => {
		axios
			.get<ProductDetails[]>("https://fakestoreapi.com/products")
			.then(({ data }) => setProducts(data));
	}, []);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-12">
			{products.map((product) => (
				<ProductCard productDetails={product} key={product.id} />
			))}
		</div>
	);
}
