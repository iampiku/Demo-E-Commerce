import { useEffect, useState } from "react";

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { ProductDetails } from "@/types";

interface SortProductsProps {
	onProductSort: (payload: {
		sortBy: keyof ProductDetails;
		sortOrder: "asc" | "desc";
	}) => void;
}

export default function SortProducts({
	onProductSort,
}: Readonly<SortProductsProps>) {
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [sortByList, setSortByList] = useState<
		{ label: string; _selected: boolean }[]
	>([
		{ label: "Price", _selected: false },
		{ label: "Rating", _selected: false },
	]);

	const onSortBySelection = (selectedSortBy: {
		label: string;
		_selected: boolean;
	}) => {
		setSortByList((previousSortByList) => {
			return previousSortByList.map((item) => ({
				...item,
				_selected: item.label === selectedSortBy.label,
			}));
		});
	};

	useEffect(() => {
		const sortBy = sortByList.find((item) => item._selected)?.label ?? null;
		if (!sortBy) return;
		onProductSort({
			sortBy: sortBy.toLowerCase() as keyof ProductDetails,
			sortOrder,
		});
	}, [onProductSort, sortByList, sortOrder]);

	return (
		<div className="flex gap-3">
			<Dropdown>
				<DropdownTrigger>
					<Button variant="shadow" color="secondary" className="flex-grow">
						Sort By:{" "}
						<strong>
							{sortByList.find((option) => option._selected)?.label ?? ""}
						</strong>
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label="Filter products">
					{sortByList.map((item) => {
						return (
							<DropdownItem
								key={item.label}
								onClick={() => onSortBySelection(item)}
								className={item._selected ? "text-primary-700" : ""}
							>
								{item.label}
							</DropdownItem>
						);
					})}
				</DropdownMenu>
			</Dropdown>

			<Button
				variant="flat"
				color="secondary"
				isIconOnly
				onClick={() =>
					setSortOrder((previousSortOrder) =>
						previousSortOrder === "asc" ? "desc" : "asc"
					)
				}
			>
				{sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
			</Button>
		</div>
	);
}
