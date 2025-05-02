import { products1 } from "@/data/products";
import React from "react";
import { ProductCard } from "../shopCards/ProductCard";
import { CanProductCard } from "../shopCards/CanProductCard";
export default function ProductGrid({ gridItems = 6, data = data }) {
	return (
		<>
			{/* <div
				style={{
					width: "fit-content",
					margin: "0  auto",
					fontSize: "17px",
					marginBottom: "24px",
				}}
			>
				{`${data.length} product(s) found`}
			</div> */}
			<div className="grid-layout wrapper-shop" data-grid={`grid-${gridItems}`}>
				{/* card product 1 */}
				{data.map((elm, i) => (
					<CanProductCard product={elm} key={i} />
				))}
			</div>{" "}
		</>
	);
}
