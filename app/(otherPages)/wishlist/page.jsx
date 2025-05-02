import Footer1 from "@/components/footers/Footer1";

import Topbar1 from "@/components/headers/Topbar1";

import Wishlist from "@/components/othersPages/Wishlist";
import React from "react";

export default function page() {
	return (
		<>
			{/* <Topbar1 />
			 */}
			<div className="paddingtopdiv tf-page-title ">
				<div className="container-full paddingtopdiv">
					<div className="heading text-center pagetitle">სურვილების სია</div>
				</div>
			</div>

			<Wishlist />
		</>
	);
}
