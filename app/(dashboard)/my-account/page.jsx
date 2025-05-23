import Footer1 from "@/components/footers/Footer1";

import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import MyAccount from "@/components/othersPages/dashboard/MyAccount";
import React from "react";

export const metadata = {
	title: "My Account || Ecomus - Ultimate Nextjs Ecommerce Template",
	description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
	return (
		<>
			<div className="tf-page-title">
				<div className="container-full">
					<div className="heading text-center">My Account</div>
				</div>
			</div>
			<section className="flat-spacing-11">
				<div className="container">
					<div className="row">
						<div className="col-lg-3">
							<DashboardNav />
						</div>
						<div className="col-lg-9">
							<MyAccount />
						</div>
					</div>
				</div>
			</section>

			<Footer1 />
		</>
	);
}
