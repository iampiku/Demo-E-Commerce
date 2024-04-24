import { useParams } from "react-router-dom";

export default function ProductDetails() {
	const { productId } = useParams();
	return <span>Hi from product Details id: {productId}</span>;
}
