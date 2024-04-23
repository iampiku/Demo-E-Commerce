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
			<CardBody className="mix-blend-multiply mx-auto">
				<div className="mx-auto">
					<Image
						shadow="none"
						radius="lg"
						alt={productDetails.title}
						src={productDetails.image}
						className="object-cover p-3 w-full h-[280px]"
					></Image>
				</div>
				<Tooltip content={productDetails.title} delay={2000}>
					<strong className="text-lg overflow-hidden whitespace-nowrap overflow-ellipsis">
						{productDetails.title}
					</strong>
				</Tooltip>
				<p className=" font-bold text-2xl text-primary-300 py-2">
					${productDetails.price}
				</p>

				<p className="pb-3 font-semibold w-full">
					Rating:{" "}
					<span className="font-normal">{productDetails.rating.rate}/5</span>
					<Chip
						variant="shadow"
						color="secondary"
						size="sm"
						className="ml-auto"
					>
						<span className="text-sm">
							{productDetails.category.toUpperCase()}
						</span>
					</Chip>
				</p>

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

				<div className="flex gap-2 flex-col sm:flex-row">
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
						variant="shadow"
						className="flex-grow"
						onClick={() => console.log(productDetails)}
						disabled={productCount === 0}
					>
						Add to Cart
					</Button>
				</div>
			</CardBody>
		</Card>
	);
}
