import NavBar from "@/components/Navbar";
import {
	Card,
	CardBody,
	Image,
	Button,
	Chip,
	Spinner,
} from "@nextui-org/react";
import { LuShoppingCart, LuArrowBigLeft } from "react-icons/lu";

import useCart from "@/hooks/useCart";
import { useParams, Link } from "react-router-dom";
import useProducts from "@/hooks/useProducts";
import useNotification from "@/hooks/useNotification";

import { formattedAmount } from "@/utils";

function ProductDetailsPage() {
	const cartContext = useCart();
	const { productId } = useParams();
	const { showNotification } = useNotification();

	const id = !productId ? null : parseInt(productId);

	const { productState, isLoading, errorMessage } = useProducts(id);

	function onAddProduct() {
		if (!cartContext || !productState.details) return;
		cartContext.dispatch({
			type: "ADD_TO_CART",
			product: productState.details,
		});

		if (!showNotification) return;
		showNotification({
			type: "success",
			message: {
				title: `Item Added to Cart!`,
				description: `You have successfully added ${productState.details.title} to your cart.`,
			},
		});
	}

	return (
		<>
			<NavBar />
			<Card isBlurred className="p-6 m-12">
				<CardBody>
					{isLoading && (
						<div className="flex justify-center items-center min-h-[600px]">
							<Spinner label="Loading product details..."></Spinner>
						</div>
					)}
					{productState.details ? (
						<div className="grid grid-cols-1 md:grid-cols-2">
							<Link to="/">
								<Button
									isIconOnly
									className="mb-3 font-medium"
									color="primary"
									variant="shadow"
								>
									<LuArrowBigLeft />
								</Button>
							</Link>
							<div className="mx-auto my-auto">
								<Image
									width={400}
									isLoading={isLoading}
									src={productState.details.image}
								></Image>
							</div>

							<div className="p-6 space-y-4">
								<Chip variant="shadow" color="secondary">
									{productState.details.category.toUpperCase()}
								</Chip>
								<p className="text-3xl font-semibold max-w-[400px]">
									{productState.details.title}
								</p>
								<p className="max-w-[500px]">
									{productState.details.description}
								</p>
								<p className="text-base font-semibold">Price:</p>
								<p className="text-xl font-bold">
									{formattedAmount(productState.details.price)}
								</p>
								<div className="flex flex-col md:flex-row gap-4">
									<Button
										color="primary"
										variant="shadow"
										onClick={onAddProduct}
										startContent={<LuShoppingCart className="text-xl" />}
									>
										ADD TO CART
									</Button>
									<Button color="default" variant="shadow">
										BUT IT NOW
									</Button>
								</div>
							</div>
						</div>
					) : (
						<p>{errorMessage?.message}</p>
					)}
				</CardBody>
			</Card>
		</>
	);
}

export default ProductDetailsPage;
