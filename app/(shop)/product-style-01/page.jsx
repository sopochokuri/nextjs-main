import Footer1 from "@/components/footers/Footer1";

import Topbar1 from "@/components/headers/Topbar1";
import ProductStyle1 from "@/components/shop/ProductStyle1";
import React from "react";

export const metadata = {
	title: "Product Style 1 || Ecomus - Ultimate Nextjs Ecommerce Template",
	description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
	return (
		<>
			<div className="tf-page-title mt-5">
				<div className="container-full">
					<div className="heading text-center mt-5">New Arrival</div>
					<p className="text-center text-2 text_black-2 mt_5">
						Shop through our latest selection of Fashion
					</p>
				</div>
			</div>
			{/* <ProductStyle1 /> */}
		</>
	);
}
