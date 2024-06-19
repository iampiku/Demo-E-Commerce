import { CartItem, ProductDetails } from "@/types";

import {
	User,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Tooltip,
	Button,
	Chip,
} from "@nextui-org/react";
import { Key, useCallback } from "react";
import QuantityCounter from "./QuantityCounter";
import { LuShoppingCart } from "react-icons/lu";
import { formattedAmount } from "@/utils";

interface DescriptionProps {
	description: string;
}

function Description({ description }: Readonly<DescriptionProps>) {
	return (
		<Tooltip delay={2000} className="max-w-[600px]" content={description}>
			<p className="text-sm truncate max-w-52">{description}</p>
		</Tooltip>
	);
}

interface CartGridProps {
	productList: CartItem[];
	handleCartClear: () => void;
	handleQuantityChange: (
		type: "increment" | "decrement",
		product: ProductDetails
	) => void;
}

export default function CartGrid({
	productList,
	handleCartClear,
	handleQuantityChange,
}: Readonly<CartGridProps>) {
	const tableHeaders = [
		{ label: "Products", key: "Products" },
		{ label: "Category", key: "Category" },
		{ label: "Price", key: "Price" },
		{ label: "Quantity", key: "Quantity" },
		{ label: "Total", key: "Total" },
		// "Actions",
	];

	const grandTotal = productList.reduce(
		(acc, { totalPrice }) => acc + totalPrice,
		0.0
	);

	const renderCustomCell = useCallback(
		(product: CartItem, columnKey: Key) => {
			switch (columnKey) {
				case "Products":
					return (
						<div className="max-w-[400px]">
							<User
								name={product.title}
								avatarProps={{ radius: "lg", src: product.image }}
								description={<Description description={product.description} />}
							>
								<span className="text-xl font-bold">{product.title}</span>
							</User>
						</div>
					);
				case "Category":
					return <Chip>{product.category}</Chip>;
				case "Price":
					return (
						<p className="font-semibold">{formattedAmount(product.price)}</p>
					);
				case "Quantity":
					return (
						<QuantityCounter
							count={product.quantity}
							onChange={(type) => handleQuantityChange(type, product)}
						/>
					);
				case "Total":
					return <p>{formattedAmount(product.totalPrice)}</p>;
				default:
					return null;
			}
		},
		[handleQuantityChange]
	);

	if (!productList.length) {
		return (
			<p className="text-center mt-12 text-3xl font-bold">
				Shopping Cart is Empty.
			</p>
		);
	}

	return (
		<div className="p-6 w-full max-w-[1400px] mx-auto">
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
								<TableCell className="max-w-[300px]">
									{renderCustomCell(product, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>

			<div className="w-full flex justify-end items-center gap-3 mt-4 mr-12">
				<p>
					Total: <strong>{formattedAmount(grandTotal)}</strong>
				</p>
				<Button
					variant="solid"
					color="danger"
					onClick={handleCartClear}
					className="flex justify-end"
					disabled={!productList.length}
				>
					Clear Cart
				</Button>
				<Button
					color="primary"
					variant="solid"
					startContent={<LuShoppingCart className="text-xl" />}
				>
					Checkout
				</Button>
			</div>
		</div>
	);
}
