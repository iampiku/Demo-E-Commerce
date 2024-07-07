import { useState } from "react";
import useQueryParams from "@/hooks/useQueryParams";

import { Button } from "@nextui-org/react";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

export default function SortProducts() {
	const [sortOrderQuery, setSortOrderQuery] = useQueryParams("sortOrder");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
		sortOrderQuery === "desc" ? "desc" : "asc"
	);

	const onSortOrderChange = () => {
		setSortOrder((previousSortOrder) =>
			previousSortOrder === "asc" ? "desc" : "asc"
		);
		setSortOrderQuery(sortOrder);
	};

	return (
		<div className="flex gap-3">
			<Button
				variant="flat"
				color="secondary"
				isIconOnly
				onClick={onSortOrderChange}
			>
				{sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
			</Button>
		</div>
	);
}
