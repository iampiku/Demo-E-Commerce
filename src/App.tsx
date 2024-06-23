import routes from "@/router";
import { Link } from "@nextui-org/react";

import { RouterProvider } from "react-router-dom";

import { CartProvider } from "@/context/CartContext.tsx";
import { NotificationProvider } from "@/context/NotificationContext";

function App() {
	return (
		<NotificationProvider>
			<CartProvider>
				<div className="min-h-screen">
					<RouterProvider router={routes} />
					<footer className="relative bottom-1 mx-auto py-10 w-full text-center text-base">
						<p>
							Build with ⚛️ by{" "}
							<span className="font-bold cursor-pointer">
								<Link
									isExternal
									href="https://github.com/iampiku"
									showAnchorIcon
								>
									Pradipta Chatterjee
								</Link>
							</span>{" "}
							👨🏽‍💻 and powered by{" "}
							<strong>
								<Link
									href="https://fakestoreapi.com/"
									isExternal
									showAnchorIcon
								>
									fakestoreapi
								</Link>
							</strong>
						</p>
					</footer>
				</div>
			</CartProvider>
		</NotificationProvider>
	);
}

export default App;
