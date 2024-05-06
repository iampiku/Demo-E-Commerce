import {
	Badge,
	Navbar,
	Button,
	NavbarItem,
	NavbarBrand,
	NavbarContent,
} from "@nextui-org/react";
import { LuShoppingBasket } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<Navbar isBlurred isBordered>
			<NavbarBrand className="font-bold text-2xl">🏪 FAKE STORE</NavbarBrand>
			<NavbarContent justify="end">
				<NavbarItem>
					<Badge content="0" color="primary" size="lg">
						<Link to="/cart">
							<Button
								isIconOnly
								color="secondary"
								variant="shadow"
								className="text-xl"
							>
								<LuShoppingBasket />
							</Button>
						</Link>
					</Badge>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
