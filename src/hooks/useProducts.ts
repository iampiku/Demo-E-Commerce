import { ProductDetails } from "@/types";

import axios, { AxiosError, CanceledError } from "axios";

import { useState, useEffect, useMemo } from "react";
import useQueryParams from "./useQueryParams";

interface ProductState {
	details: ProductDetails | null;
	products: ProductDetails[];
}

const initialProductState: ProductState = {
	details: null,
	products: [],
} as const;

export default function useProducts(id: null | number) {
	const [productState, setProductState] = useState<ProductState>({
		...initialProductState,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<{
		message: string;
		code: number;
	} | null>(null);

	const filter = useQueryParams("category")[0];
	const sortOrder = useQueryParams("sortOrder")[0];

	const API_URL = useMemo(() => {
		let url = "https://fakestoreapi.com/products";
		if (id) return `https://fakestoreapi.com/products/${id}`;
		if (filter && filter.toLowerCase() !== "all products")
			url += `/category/${filter}`;
		if (sortOrder) url += `?sort=${sortOrder}`;
		return url;
	}, [id, filter, sortOrder]);

	useEffect(() => {
		setIsLoading(true);
		const controller = new AbortController();

		axios
			.get<ProductDetails[] | ProductDetails>(API_URL)
			.then(({ data }) =>
				setProductState((oldProducts) => {
					if (!id && Array.isArray(data))
						return { products: data, details: null };
					else if (id && !Array.isArray(data))
						return { details: data, products: [] };
					else return { ...oldProducts };
				})
			)
			.catch((error: AxiosError) => {
				if (error instanceof CanceledError) return;

				setProductState(initialProductState);
				setErrorMessage({
					message: error.message,
					code: error.code ? parseInt(error.code) : 404,
				});
			})
			.finally(() => setIsLoading(false));

		return () => controller.abort();
	}, [API_URL, id]);

	return {
		productState,
		isLoading,
		errorMessage,
	};
}
