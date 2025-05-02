"use client";

import { useEffect, useState } from "react";

export default function Quantity({
	setQuantity = (value) => {},
	setmyQuantity = (value) => {},
	isLoaded,
	initialQuantity,
}) {
	const [count, setCount] = useState(() => initialQuantity);
	useEffect(() => {
		setQuantity(count);
		setmyQuantity(count);
	}, [isLoaded]);

	return (
		<div className="wg-quantity">
			<span
				className="btn-quantity minus-btn"
				onClick={() => setCount((pre) => (pre == 1 ? 1 : pre - 1))}
			>
				-
			</span>
			<input
				min={1}
				type="text"
				onChange={(e) => setCount(e.target.value / 1)}
				name="number"
				value={count}
			/>
			<span
				className="btn-quantity plus-btn"
				onClick={() => setCount((pre) => pre + 1)}
			>
				+
			</span>
		</div>
	);
}
