import BlogLeftSidebar from "@/components/blogs/BlogLeftSidebar";
import Footer1 from "@/components/footers/Footer1";

import React from "react";
import Link from "next/link";
export const metadata = {
	title: "Blog  Sidebar Left || Ecomus - Ultimate Nextjs Ecommerce Template",
	description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
	return (
		<>
			<div className="tf-page-title">
				<div className="container-full">
					<div className="row">
						<div className="col-12">
							<div className="heading text-center">Blog Sidebar Left</div>
							<ul className="breadcrumbs d-flex align-items-center justify-content-center">
								<li>
									<Link href={`/`}>Home</Link>
								</li>
								<li>
									<i className="icon-arrow-right" />
								</li>
								<li>Fashion</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<BlogLeftSidebar />

			<Footer1 />
		</>
	);
}
