import useQueryParams from "@/hooks/useQueryParams";
import {
	Dropdown,
	DropdownTrigger,
	Button,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";

import { useEffect, useState } from "react";

export default function FilterProducts() {
	const [categories, setCategories] = useState<
		{
			label: string;
			_selected: boolean;
		}[]
	>([
		{ label: "All Products", _selected: true },
		{ label: "Electronics", _selected: false },
		{ label: "Jewelery", _selected: false },
		{ label: "Men's clothing", _selected: false },
		{ label: "Women's clothing", _selected: false },
	]);
	const [query, setQuery] = useQueryParams("category");

	useEffect(() => {
		if (!query) {
			setQuery("all products");
			return;
		}
		setCategories((previousCategories) => {
			return previousCategories.map((category) => ({
				...category,
				_selected: category.label.toLowerCase() === query,
			}));
		});
	}, [query, setQuery]);

	const onCategorySelection = (selectedCategory: {
		label: string;
		_selected: boolean;
	}) => {
		setCategories((previousCategories) => {
			return previousCategories.map((category) => ({
				...category,
				_selected: category.label === selectedCategory.label,
			}));
		});

		setQuery(selectedCategory.label.toLowerCase(), { replace: false });
	};

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="shadow" color="secondary">
					Filter By Category:{" "}
					<strong>
						{categories.find((option) => option._selected)?.label ?? ""}
					</strong>
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Filter products">
				{categories.map((item) => {
					return (
						<DropdownItem
							key={item.label}
							onClick={() => onCategorySelection(item)}
							className={item._selected ? "text-primary-700" : ""}
						>
							{item.label}
						</DropdownItem>
					);
				})}
			</DropdownMenu>
		</Dropdown>
	);
}
