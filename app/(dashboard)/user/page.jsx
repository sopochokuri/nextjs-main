import Footer1 from "@/components/footers/Footer1";

import Userdata from "@/components/othersPages/Userdata";
import React from "react";

export const metadata = {
	title: "Profile || Ecomus - Ultimate Nextjs Ecommerce Template",
	description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
	return (
		<>
			<div className="tf-page-title">
				<div className="container-full paddingtopdiv">
					<div className="heading text-center mainfont pagetitle">
						პირადი ინფორმაცია
					</div>
				</div>
			</div>

			<Userdata />
		</>
	);
}
