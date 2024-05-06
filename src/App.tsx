import routes from "@/router";

import { RouterProvider } from "react-router-dom";

function App() {
	return (
		<main>
			<RouterProvider router={routes} />;
		</main>
	);
}

export default App;
