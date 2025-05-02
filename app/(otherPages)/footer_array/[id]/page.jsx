"use client";
import Footer1 from "@/components/footers/Footer1";
import React from "react";
import { getfooterinfo } from "@/services/Api";
import { useState, useEffect } from "react";

export default function page({ params }) {
	const [footerdata, setFooterdata] = useState("");

	useEffect(() => {
		getfooterdata();
	}, []);

	const getfooterdata = async () => {
		try {
			const getfooter = await getfooterinfo(params.id);
			setFooterdata(getfooter?.page);
			console.log(getfooter);
		} catch (error) {
			console.log(error);
		}
	};
	const extractText = (html) => {
		const doc = new DOMParser().parseFromString(html, "text/html");
		return doc.body.textContent || "";
	};
	return (
		<>
			<>
				{/* page-title */}
				<div className="tf-page-title style-2 ">
					<div className="container-full paddingtopdiv">
						<div className="heading text-center">
							{" "}
							{footerdata?.description && extractText(footerdata?.description)}
						</div>
					</div>
				</div>
				<section className="flat-spacing-25">
					<div className="container">
						<div className="tf-main-area-page">
							<p> {footerdata?.content && extractText(footerdata?.content)}</p>
						</div>
					</div>
				</section>
			</>
		</>
	);
}
