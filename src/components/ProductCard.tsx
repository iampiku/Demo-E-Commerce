import { ProductDetails } from "@/types";
import {
	Chip,
	Card,
	CardBody,
	CardFooter,
	Image,
	Button,
	Tooltip,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

import { Key, useState } from "react";

interface ProductCardProps {
	productDetails: ProductDetails;
}

export default function ProductCard({
	productDetails,
}: Readonly<ProductCardProps>) {
	const [productCount, setProductCount] = useState(1);

	function updateProductCount(quantity: Key) {
		const count = parseInt(quantity.toString()) + 1;
		setProductCount(count);
	}

	return (
		<Card isBlurred shadow="md" className="bg-slate-100 ">
			<div className="mx-auto mix-blend-multiply">
				<Image
					shadow="none"
					radius="lg"
					alt={productDetails.title}
					src={productDetails.image}
					className="object-cover p-3 w-full h-[280px]"
				></Image>
			</div>
			<CardBody className=" mx-auto">
				<Tooltip content={productDetails.title} delay={2000}>
					<Link
						to={`/${productDetails.id}`}
						className="text-lg overflow-hidden whitespace-nowrap overflow-ellipsis "
					>
						<strong>{productDetails.title}</strong>
					</Link>
				</Tooltip>
				<p className=" font-bold text-2xl text-primary-300 py-2">
					${productDetails.price}
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
						<p className="text-sm max-h-[60px] overflow-hidden whitespace-normal overflow-ellipsis">
							{productDetails.description}
						</p>
					</Tooltip>
				</div>

				<CardFooter className="flex gap-1 flex-col sm:flex-row">
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
								return <DropdownItem key={index}>{index + 1}</DropdownItem>;
							})}
						</DropdownMenu>
					</Dropdown>
					<Button
						color="primary"
						variant="solid"
						className="flex-grow"
						onClick={() => console.log(productDetails)}
						disabled={productCount === 0}
						startContent={<MdAddShoppingCart className="text-xl" />}
					>
						Add to Cart
					</Button>
				</CardFooter>
			</CardBody>
		</Card>
	);
}
