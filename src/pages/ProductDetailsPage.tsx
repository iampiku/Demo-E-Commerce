import NavBar from "@/components/Navbar";
import { Card, CardBody, Image, Button, Chip } from "@nextui-org/react";

import useProducts from "@/hooks/useProducts";
import { useParams } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import useCart from "@/hooks/useCart";
import useNotification from "@/hooks/useNotification";

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
					{isLoading && <span>Loading...</span>}
					{productState.details ? (
						<div className="grid grid-cols-1 md:grid-cols-2">
							<div className="mx-auto">
								<Image
									isZoomed
									shadow="none"
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
								<p className="text-xl">$ {productState.details.price}</p>
								<div className="flex flex-col md:flex-row gap-4">
									<Button
										color="primary"
										variant="solid"
										onClick={onAddProduct}
										startContent={<LuShoppingCart className="text-xl" />}
									>
										ADD TO CART
									</Button>
									<Button color="default" variant="flat">
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
