"use client";
import Topbar1 from "@/components/headers/Topbar1";
import ShopFullwidth from "@/components/shop/ShopFullwidth";
import React, { useEffect, useState } from "react";
import { getcategory, ShopbyCatalog } from "@/services/Api";
// export const metadata = {
// 	title: "Shop Full Width || Ecomus - Ultimate Nextjs Ecommerce Template",
// 	description: "Ecomus - Ultimate Nextjs Ecommerce Template",
// };

export default function page({ params }) {
	const [title, setTitle] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			try {
				const responsetitle = await getcategory(params.id);

				setTitle(responsetitle);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);
	return (
		<>
			<div className="tf-page-title ">
				<div className="container-full paddingtopdiv">
					<div
						className="heading text-center mainfont"
						style={{ fontSize: "28px" }}
					>
						{title}
					</div>
				</div>
			</div>
			<ShopFullwidth
				fetchProducts={(page, catalog) => ShopbyCatalog(page, params.id)}
			/>
		</>
	);
}
