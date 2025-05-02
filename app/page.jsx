"use client";
import Topbar1 from "@/components/headers/Topbar1";
import ShopFullwidth from "@/components/shop/ShopFullwidth";
import React from "react";
import { Allproducts } from "@/services/Api";
// export const metadata = {
// 	title: "test Template",
// 	description: "Ecomus - Ultimate Nextjs Ecommerce Template",
// };
export default function page() {
	return (
		<>
			<div className="tf-page-title ">
				<div className="container-full paddingtopdiv">
					<div className="heading text-center mainfont">ბანერი</div>
					<p className="text-center text-2 text_black-2 mt_5"></p>
				</div>
			</div>
			<ShopFullwidth fetchProducts={(page) => Allproducts(page)} />
		</>
	);
}
