"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import CountdownComponent from "../common/Countdown";
import ProductImageSlideshow from "./ProductImageSlideshow";
import { Similarproducts } from "@/services/Api";
import { CanProductCard } from "./CanProductCard";

export const ProductCard = ({ similarproduct }) => {
	const [currentImage, setCurrentImage] = useState(similarproduct.images);
	const { setQuickViewItem } = useContextElement();
	const {
		setQuickAddItem,
		addToWishlist,
		isAddedtoWishlist,
		addToCompareItem,
		isAddedtoCompareItem,
		isAddedToCartProducts,
		addProductToCart,
	} = useContextElement();
	useEffect(() => {
		setCurrentImage(similarproduct.images);
	}, [similarproduct]);

	return (
		<>
			<CanProductCard product={similarproduct} />
		</>
	);
};
