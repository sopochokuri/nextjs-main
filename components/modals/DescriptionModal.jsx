"use client";

export default function DescriptionModal({ data }) {
	return (
		<div
			className="modal fullRight fade modal-shopping-cart paddingtopdiv"
			id="shoppingCart"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="productdesc modaltext">
						<p>{data || "No description available"}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
