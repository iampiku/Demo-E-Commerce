import {
	Badge,
	Button,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react";
import { LuShoppingBasket } from "react-icons/lu";

import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<Navbar isBlurred isBordered>
			<NavbarBrand className="font-bold text-2xl">🏪 FAKE STORE</NavbarBrand>
			<NavbarContent justify="end">
				<NavbarItem>
					<Link to="/cart">
						<Badge content="0" color="primary" size="lg">
							<Button isIconOnly color="secondary" variant="shadow" size="lg">
								<LuShoppingBasket />
							</Button>
						</Badge>
					</Link>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
