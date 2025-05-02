import React, { useState, useEffect } from "react";
import Image from "next/image"; // If using Next.js, else remove this

const ProductImageSlideshow = ({ product, images }) => {
	const [currentImage, setCurrentImage] = useState(
		typeof product?.mainimage1 === "undefined"
			? product?.images[0]?.file_name
			: product?.mainimage1
	);
	const [slideshowActive, setSlideshowActive] = useState(false);
	let intervalId = null;
	const handleMouseOver = () => {
		setSlideshowActive(true);
	};

	const handleMouseOut = () => {
		setSlideshowActive(false);
		setCurrentImage(
			typeof product?.mainimage1 === "undefined"
				? product?.images[0]?.file_name
				: product?.mainimage1
		); // Reset to first image
	};

	useEffect(() => {
		if (slideshowActive) {
			let index = 0;
			intervalId = setInterval(() => {
				index = (index + 1) % images.length;
				setCurrentImage(images[index]?.file_name);
			}, 1300); // Change image every second
		} else {
			clearInterval(intervalId);
		}
		return () => clearInterval(intervalId);
	}, [slideshowActive, images]);

	return (
		<div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
			<Image
				className="lazyload img-product"
				src={`https://digital-cms.ge/${currentImage}`}
				alt="image-product"
				width={720}
				height={1005}
				title="Product Image"
			/>
			<Image
				className="lazyload img-hover"
				src={`https://digital-cms.ge/${currentImage}`}
				alt="image-product"
				onMouseOver={handleMouseOver}
				width={720}
				height={1005}
			/>
		</div>
	);
};

export default ProductImageSlideshow;
