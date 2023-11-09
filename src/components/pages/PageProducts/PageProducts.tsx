/** @format */

import Products from "~/components/pages/PageProducts/components/Products";
import Box from "@mui/material/Box";
import TaskImage from "assets/images/module_focus.png";

export default function PageProducts() {
	return (
		<Box py={3}>
			Task_2_
			<br />
			<img src={TaskImage} alt="TaskImage" height={300} />
			<Products />
		</Box>
	);
}
