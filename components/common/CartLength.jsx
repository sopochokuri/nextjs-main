"use client";

import { useContextElement } from "@/context/Context";

export default function CartLength() {
	const { totalcartQ } = useContextElement();
	return totalcartQ > 0 ? <span className="count-box">{totalcartQ}</span> : "";
}
