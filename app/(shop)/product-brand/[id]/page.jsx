"use client"; // This makes this component a Client Component

import React, { useEffect, useState } from "react";
import { getbrand } from "@/services/Api";
import ProductGrid from "@/components/shop/ProductGrid";
import EmptyProductGrid from "@/components/shop/EmptyProductGrid";
import Loadmore from "@/components/common/Loadmore";
import { ClipLoader, DotLoader } from "react-spinners";
export default function Page({ params }) {
	const [title, setTitle] = useState("");
	const [products, setProducts] = useState([]);
	const [gridItems, setGridItems] = useState(6);
	const [loadmore, setLoadMore] = useState(true);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getbrand(params.id);

				if (Array.isArray(response)) {
					setProducts(response);

					setLoading(false);
					console.log("productslenght", productslenght);
				} else {
					console.error("API response is not an array:", response);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [params.id]);
	return (
		<>
			<div className="tf-page-title">
				<div className="container-full paddingtopdiv">
					<div
						className="heading text-center mainfont"
						style={{ fontSize: "28px" }}
					>
						{title}
					</div>
				</div>
			</div>
			<div className="container-full">
				<div className="wrapper-control-shop">
					<div className="meta-filter-shop" />
					{loading ? (
						<EmptyProductGrid gridItems={gridItems} />
					) : (
						<>
							<ProductGrid
								// allproducts={finalSorted}
								gridItems={gridItems}
								data={products}
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
}
