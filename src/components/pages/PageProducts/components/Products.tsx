/** @format */

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useAvailableProducts } from "~/queries/products";
import { useNavigate } from "react-router-dom";

export default function Products() {
	const { data = [], isLoading } = useAvailableProducts();
	const navigate = useNavigate();

	if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	const handlerPickedCard = async (id: string | undefined) => {
		console.log("handlerPickedCard", id);

		navigate(`product/${id}`);
	};

	return (
		<Grid container spacing={4}>
			{data.map(({ count, ...product }, index) => (
				<Grid
					item
					key={product.id}
					xs={12}
					sm={6}
					md={4}
					onClick={() => handlerPickedCard(product.id)}
				>
					<Card
						sx={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
							cursor: "pointer",
							":hover": { opacity: 0.8 },
						}}
					>
						<CardMedia
							sx={{ pt: "56.25%" }}
							image={`https://source.unsplash.com/random?sig=${index}`}
							title="Image title"
						/>
						<CardContent sx={{ flexGrow: 1 }}>
							<Typography gutterBottom variant="h5" component="h2">
								{product.title}
							</Typography>
							<Typography>{formatAsPrice(product.price)}</Typography>
						</CardContent>
						<CardActions>
							<AddProductToCart product={product} />
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
