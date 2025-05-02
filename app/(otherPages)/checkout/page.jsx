import Footer1 from "@/components/footers/Footer1";

import Checkout from "@/components/othersPages/Checkout";
import React from "react";

export const metadata = {
	title: "Checkout || Ecomus - Ultimate Nextjs Ecommerce Template",
	description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
	return (
		<>
			<div className="tf-page-title">
				<div className="container-full paddingtopdiv">
					<div className="heading text-center mainfont pagetitle">
						ანგარიშსწორება
					</div>
				</div>
			</div>

			<Checkout />
		</>
	);
}
