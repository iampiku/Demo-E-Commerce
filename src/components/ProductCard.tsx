import { ProductDetails } from "@/types";
import {
	Chip,
	Card,
	CardBody,
	Image,
	Button,
	Tooltip,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

import { Key, useState } from "react";
import { formattedAmount } from "@/utils";

interface ProductCardProps {
	productDetails: ProductDetails;
	onAddProduct: (product: ProductDetails, quantity: number) => void;
}

export default function ProductCard({
	onAddProduct,
	productDetails,
}: Readonly<ProductCardProps>) {
	const [productCount, setProductCount] = useState(1);

	function updateProductCount(quantity: Key) {
		const count = parseInt(quantity.toString()) + 1;
		setProductCount(count);
	}

	return (
		<Card isBlurred shadow="md">
			<div className="mx-auto mix-blend-multiply">
				<Image
					shadow="none"
					radius="lg"
					alt={productDetails.title}
					src={productDetails.image}
					className="object-cover p-3 h-[280px]"
				></Image>
			</div>
			<CardBody className="mx-auto">
				<Tooltip content={productDetails.title} delay={2000}>
					<Link
						to={`product/${productDetails.id}`}
						className="text-lg overflow-hidden whitespace-nowrap overflow-ellipsis "
					>
						<strong>{productDetails.title}</strong>
					</Link>
				</Tooltip>
				<p className=" font-bold text-2xl text-primary-300 py-2">
					{formattedAmount(productDetails.price)}
				</p>
				<div className="flex">
					<p className="pb-3 font-semibold w-full">
						Rating:{" "}
						<span className="font-normal">{productDetails.rating.rate}/5</span>
					</p>
					<Chip
						variant="shadow"
						color="secondary"
						size="sm"
						className="ml-auto"
					>
						{productDetails.category.toUpperCase()}
					</Chip>
				</div>

				<div className="pb-4">
					<p className="font-bold">Description</p>
					<Tooltip
						delay={2000}
						className="max-w-[600px]"
						content={productDetails.description}
					>
						<p className="text-sm truncate">{productDetails.description}</p>
					</Tooltip>
				</div>

				<div className="flex gap-1 flex-col sm:flex-row w-full">
					<Dropdown className="flex-grow">
						<DropdownTrigger>
							<Button variant="ghost">{productCount}</Button>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Product Count"
							variant="shadow"
							disallowEmptySelection
							selectionMode="single"
							onAction={(key) => updateProductCount(key)}
							selectedKeys={[productCount]}
						>
							{Array.from({ length: 4 }).map((_, index) => {
								return (
									<DropdownItem key={index} textValue={index.toString()}>
										{index + 1}
									</DropdownItem>
								);
							})}
						</DropdownMenu>
					</Dropdown>
					<Button
						color="primary"
						variant="solid"
						className="flex-grow"
						onClick={() => onAddProduct(productDetails, productCount)}
						startContent={<LuShoppingCart className="text-xl" />}
					>
						Add to Cart
					</Button>
				</div>
			</CardBody>
		</Card>
	);
}
