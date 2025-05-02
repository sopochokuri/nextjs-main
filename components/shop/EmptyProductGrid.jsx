import { products1 } from "@/data/products";
import React from "react";
import { ProductCard } from "../shopCards/ProductCard";
import { CanProductCard } from "../shopCards/CanProductCard";
import Image from "next/image";
import Link from "next/link";
export default function EmptyProductGrid({ gridItems = 6 }) {
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
				&nbsp;&nbsp;&nbsp;&nbsp;
			</div> */}
			<div
				className="grid-layout wrapper-shop "
				data-grid={`grid-${gridItems}`}
			>
				{Array.from({ length: 24 }, (_, index) => (
					<div className="card-product fl-item  emptyimage" key={index}>
						<div className="card-product-wrapper">
							<Image
								className="lazyload img-product"
								data-src="/images/products/product1.jpg"
								src="/images/products/product1.jpg"
								alt="image-product"
								width={720}
								height={1005}
								style={{ opacity: 0 }}
							/>
						</div>
						<div className="card-product-info" style={{ height: "84px" }}></div>
					</div>
				))}
			</div>{" "}
		</>
	);
}
