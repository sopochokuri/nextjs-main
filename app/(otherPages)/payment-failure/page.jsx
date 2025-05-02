import Footer1 from "@/components/footers/Footer1";

import PaymentFailure from "@/components/othersPages/PaymentFailure";
import React from "react";

export const metadata = {
	title: "Payment Failure || Ecomus - Ultimate Nextjs Ecommerce Template",
	description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
	return (
		<>
			<div className="tf-page-title">
				<div className="container-full">
					<div className="heading text-center">Payment Failure</div>
				</div>
			</div>

			<PaymentFailure />
			<Footer1 />
		</>
	);
}
