import NavBar from "@/components/Navbar";
import { Card, CardBody, Image, Button } from "@nextui-org/react";

import useProducts from "@/hooks/useProducts";
import { useParams } from "react-router-dom";

function ProductDetailsPage() {
	const { productId } = useParams();
	const id = !productId ? null : parseInt(productId);

	const { products, isLoading, errorMessage } = useProducts(id);
	const productDetails = products && !Array.isArray(products) ? products : null;

	return (
		<>
			<NavBar />
			<div className="h-screen p-4">
				<Card isBlurred className="p-6 h-full">
					<CardBody>
						{isLoading && <span>Loading...</span>}
						{productDetails ? (
							<div className="flex flex-col md:flex-row mix-blend-multiply">
								<Image
									isZoomed
									shadow="none"
									isLoading={isLoading}
									className="mx-auto"
									src={productDetails.image}
								></Image>

								<div className="p-6 space-y-4">
									<p className="text-5xl font-semibold">
										{productDetails.title}
									</p>
									<p>{productDetails.description}</p>
									<p className="text-3xl">$ {productDetails.price}</p>
									<div className="flex gap-4">
										<Button color="primary" variant="solid">
											ADD TO CART
										</Button>
										<Button color="default" variant="solid">
											BUT IT NOW
										</Button>
									</div>
								</div>
							</div>
						) : (
							<p>{errorMessage}</p>
						)}
					</CardBody>
				</Card>
			</div>
		</>
	);
}

export default ProductDetailsPage;
