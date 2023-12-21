/** @format */

import { useParams } from "react-router-dom";
import { useAvailableProduct } from "~/queries/products";

export const DetailProduct = () => {
	const { id } = useParams();
	const { data, isLoading, isError } = useAvailableProduct(id);
	console.log("DetailProduct", id, data);
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error occurred while fetching product.</div>;
	}

	return (
		<div>
			<h1>DetailProduct</h1>
			<div>{data?.title}</div>
			<div>{data?.price}</div>
			<div>{data?.description}</div>
		</div>
	);
};
