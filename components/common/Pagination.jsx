"use client";
import React, { useState } from "react";

export default function Pagination({ data }) {
	// State to track the active page
	const [activePage, setActivePage] = useState(1);
	const [activePageIndex, setActivePageIndex] = useState(1);
	const [totalPages, setTotalPages] = useState(Math.ceil(data.length / 12));

	// Function to handle page click
	const handlePageClick = (pageNumber) => {
		setActivePage(pageNumber);
	};

	return (
		<>
			{Array.from({ length: totalPages }, (_, index) => (
				<li
					key={index + 1}
					className={activePage === index + 1 ? "active" : ""}
				>
					<a
						className="pagination-link"
						onClick={() => handlePageClick(index + 1)}
					>
						{index + 1}
					</a>
				</li>
			))}

			<li>
				<a
					onClick={() =>
						setActivePage((pre) => (pre !== data.length ? pre + 1 : pre))
					}
					className="pagination-link animate-hover-btn"
				>
					<span className="icon icon-arrow-right" />
				</a>
			</li>
		</>
	);
}
