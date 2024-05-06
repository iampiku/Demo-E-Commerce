import { ProductDetails } from "@/types";

import axios, { AxiosError, CanceledError } from "axios";

import { useState, useEffect, useMemo } from "react";

export default function useProducts(id: null | number) {
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<
		ProductDetails[] | ProductDetails | null
	>(null);
	const [errorMessage, setErrorMessage] = useState("");

	const API_URL = useMemo(() => {
		return id
			? `https://fakestoreapi.com/products/${id}`
			: "https://fakestoreapi.com/products";
	}, [id]);

	useEffect(() => {
		setIsLoading(true);
		const controller = new AbortController();

		axios
			.get<ProductDetails[] | ProductDetails>(API_URL)
			.then(({ data }) => setProducts(data))
			.catch((error: AxiosError) => {
				if (error instanceof CanceledError) return;

				setProducts(null);
				setErrorMessage(error.message);
			})
			.finally(() => setIsLoading(false));

		return () => controller.abort();
	}, [API_URL]);

	return {
		products,
		isLoading,
		errorMessage,
	};
}
