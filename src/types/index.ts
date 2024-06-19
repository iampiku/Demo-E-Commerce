type Rating = {
	rate: number;
	count: number;
};
export type ProductDetails = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: Rating;
};
export type CartItem = ProductDetails & {
	quantity: number;
	totalPrice: number;
};
export type Notification = {
	type: "error" | "success" | "warning";
	message: {
		title: string;
		description: string;
	};
};
