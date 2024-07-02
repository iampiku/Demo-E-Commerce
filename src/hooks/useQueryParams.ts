import { useCallback, useMemo } from "react";
import { useSearchParams, NavigateOptions } from "react-router-dom";

export default function useQueryParams(
	key: "category" | "sortBy" | "sortOrder"
): [
	value: string | null,
	setValue: (newValue: string, option?: NavigateOptions) => void
] {
	const [searchParams, setSearchParams] = useSearchParams();
	const params = searchParams.get(key);

	const value = useMemo(() => {
		if (!params) return null;

		try {
			return decodeURIComponent(params);
		} catch (error) {
			console.error(error);
			return null;
		}
	}, [params]);

	const setValue = useCallback(
		(newValue: string, option?: NavigateOptions) => {
			const newSearchParams = new URLSearchParams(searchParams);
			newSearchParams.set(key, encodeURIComponent(newValue));
			setSearchParams(newSearchParams, option);
		},
		[key, searchParams, setSearchParams]
	);

	return [value, setValue];
}
