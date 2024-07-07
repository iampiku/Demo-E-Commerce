import { ProductDetails } from "@/types";
import {
	Chip,
	Card,
	CardBody,
	Image,
	Button,
	Tooltip,
	Badge,
} from "@nextui-org/react";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

import { formattedAmount } from "@/utils";
import useCart from "@/hooks/useCart";

interface ProductCardProps {
	productDetails: ProductDetails;
	onAddProduct: (product: ProductDetails, quantity: number) => void;
}

export default function ProductCard({
	onAddProduct,
	productDetails,
}: Readonly<ProductCardProps>) {
	const cartContext = useCart();

	const isProductInCart =
		cartContext?.state.cartItems.some(
			(cartItem) => cartItem.id === productDetails.id
		) || false;

	return (
		<Badge
			variant="shadow"
			color="secondary"
			isInvisible={!isProductInCart}
			className="absolute top-2 right-2"
			content={<LuShoppingCart className="text-base m-2" />}
		>
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
							<span className="font-normal">
								{productDetails.rating.rate}/5
							</span>
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

					<div className="flex w-full">
						<Button
							color="primary"
							variant="solid"
							className="flex-grow"
							onClick={() => onAddProduct(productDetails, 1)}
							startContent={<LuShoppingCart className="text-xl" />}
						>
							Add to Cart
						</Button>
					</div>
				</CardBody>
			</Card>
		</Badge>
	);
}
