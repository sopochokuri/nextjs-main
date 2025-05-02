import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";

import Cart from "@/components/othersPages/Cart";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import React from "react";

export const metadata = {
	title: "View Cart || Ecomus - Ultimate Nextjs Ecommerce Template",
	description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
	return (
		<>
			<div className="tf-page-title ">
				<div className="container-full paddingtopdiv">
					<div
						className="heading text-center pagetitle"
						style={{ fontSize: "28px" }}
					>
						კალათა
					</div>
				</div>
			</div>

			<Cart />
			{/* <Testimonials />
			<RecentProducts /> */}
		</>
	);
}
