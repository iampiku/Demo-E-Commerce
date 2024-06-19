import { CartContext } from "@/context/CartContext";
import {
	Badge,
	Navbar,
	Button,
	NavbarItem,
	NavbarBrand,
	NavbarContent,
} from "@nextui-org/react";
import { useContext } from "react";
import { LuShoppingBasket } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
	const navigate = useNavigate();
	const context = useContext(CartContext);
	const cartItemCount = context?.state.cartItems.length ?? 0;

	const onCartClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		navigate("/cart");
		event.preventDefault();
	};

	return (
		<Navbar isBlurred isBordered>
			<Link to="/">
				<NavbarBrand className="font-bold text-2xl">🏪 Fake Store</NavbarBrand>
			</Link>
			<NavbarContent justify="end">
				<NavbarItem>
					<Badge content={cartItemCount} color="primary" size="lg">
						<Button
							isIconOnly
							color="secondary"
							variant="shadow"
							className="text-xl"
							onClick={(e) => onCartClick(e)}
						>
							<LuShoppingBasket />
						</Button>
					</Badge>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
