"use client";

import { useEffect, useState } from "react";
import { useContextElement } from "@/context/Context";
export default function MainPageQuantity({
	setQuantity = (value) => {},
	addProduct = (value) => {},
	minusFunc = (value) => {},
	AddedCartProductQuantity,
}) {
	const [count, setCount] = useState(AddedCartProductQuantity);
	useEffect(() => {
		setQuantity(count);
	}, [count]);

	const plusFunction = () => {
		setCount((pre) => pre + 1);
		addProduct();
	};
	const minusFunction = () => {
		setCount((pre) => (pre == 1 ? 1 : pre - 1));
		minusFunc();
	};

	return (
		<div className="mainpagecount wg-quantity">
			<div className="btn-quantity minus-btn" onClick={() => minusFunction()}>
				-
			</div>
			<input
				min={1}
				type="text"
				onChange={(e) => setCount(e.target.value / 1)}
				name="number"
				value={count}
			/>
			<span className="btn-quantity plus-btn" onClick={() => plusFunction()}>
				+
			</span>
		</div>
	);
}
