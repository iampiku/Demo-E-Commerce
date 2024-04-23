import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { ProductDetails } from "@/types";
import axios from "axios";

function App() {
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

export default App;
