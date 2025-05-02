"use client";
import React, { useState } from "react";

export default function Loadmore({ onLoadMore }) {
	// State to track the active page
	const [activePage, setActivePage] = useState(1);
	const [activePageIndex, setActivePageIndex] = useState(1);

	const [data, setData] = useState([]);
	const [totalPages, setTotalPages] = useState(Math.ceil(data.length / 12));
	const [loading, setLoading] = useState(true);

	// Function to handle page click

	return (
		<>
			{/* <a
				// onClick={() =>
				// 	setActivePage((pre) => (pre !== data.length ? pre + 1 : pre))
				// }
				
				className="pagination-link animate-hover-btn"
			>
				Load more
			</a> */}
			<button
				type="button"
				onClick={() => onLoadMore()}
				className="btn mainbutton"
			>
				მეტის ნახვა
			</button>
		</>
	);
}
