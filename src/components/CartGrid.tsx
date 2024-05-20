import useProducts from "@/hooks/useProducts";

import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
} from "@nextui-org/react";

export default function CartGrid() {
	const { productState } = useProducts(null);

	const tableHeaders = [
		{ label: "Products", key: "label" },
		{ label: "Price", key: "price" },
		{ label: "Quantity", key: "quantity" },
		{ label: "Total", key: "total" },
		// "Actions",
	];
	const productList = productState.products.map((product) => ({
		...product,
		quantity: 2,
		total: 200,
	}));

	return (
		<div className="p-6">
			<Table aria-label="cart-items-table">
				<TableHeader columns={tableHeaders}>
					{(column) => (
						<TableColumn key={column.key}>{column.label}</TableColumn>
					)}
				</TableHeader>

				<TableBody items={productList}>
					{(product) => (
						<TableRow key={product.id}>
							{(columnKey) => (
								<TableCell>{getKeyValue(product, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
