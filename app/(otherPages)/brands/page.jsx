import Footer1 from "@/components/footers/Footer1";

import Brands from "@/components/othersPages/brands/Brands";
import React from "react";

export const metadata = {
	title: "Brands || Ecomus - Ultimate Nextjs Ecommerce Template",
	description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
	return (
		<>
			<div className="tf-page-title style-2">
				<div className="container-full">
					<div className="heading text-center">Brands</div>
				</div>
			</div>

			<Brands />
			<Footer1 />
		</>
	);
}
