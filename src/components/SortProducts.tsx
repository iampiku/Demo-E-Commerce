import { useEffect, useState } from "react";

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import useQueryParams from "@/hooks/useQueryParams";

export default function SortProducts() {
	const [sortByQuery, setSortByQuery] = useQueryParams("sortBy");
	const [sortOrderQuery, setSortOrderQuery] = useQueryParams("sortOrder");

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
		setSortByQuery(selectedSortBy.label.toLowerCase());
		setSortOrderQuery(sortOrder);
	};

	const onSortOrderChange = () => {
		setSortOrder((previousSortOrder) =>
			previousSortOrder === "asc" ? "desc" : "asc"
		);
		setSortOrderQuery(sortOrder);
	};

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
				onClick={onSortOrderChange}
			>
				{sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
			</Button>
		</div>
	);
}
