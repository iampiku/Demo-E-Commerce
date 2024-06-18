export function sortItems<T>(params: {
	arr: Array<T>;
	sortBy: keyof T;
	sortOrder: "asc" | "desc";
}): Array<T> {
	const { arr, sortBy, sortOrder } = params;
	if (!arr.length || !sortBy) return arr;

	return arr.sort((a, b) => {
		if (sortOrder === "asc") {
			if (a[sortBy] > b[sortBy]) return -1;
			if (a[sortBy] < b[sortBy]) return 1;
			return 0;
		} else {
			if (a[sortBy] > b[sortBy]) return 1;
			if (a[sortBy] < b[sortBy]) return -1;
			return 0;
		}
	});
}
