import routes from "@/router";

import NavBar from "@/components/Navbar";

import { RouterProvider } from "react-router-dom";

function App() {
	return (
		<>
			<NavBar />
			<main>
				<RouterProvider router={routes} />;
			</main>
		</>
	);
}

export default App;
