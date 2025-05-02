"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import CountdownComponent from "../common/Countdown";
// import ProductImageSlideshow from "./ProductImageSlideshow";

export const ProductCardWishlist = ({ product }) => {
	console.log("product", product?.price);
	const [currentImage, setCurrentImage] = useState(product.imgSrc);
	const [imagesArray, setImagesArray] = useState([]);
	const [isHovered, setIsHovered] = useState(false);
	const { setQuickViewItem } = useContextElement();

	const {
		setQuickAddItem,
		addToWishlist,
		isAddedtoWishlist,
		removeFromWishlist,
		addToCompareItem,
		isAddedtoCompareItem,
		isAddedToCartProducts,
		addProductToCart,
	} = useContextElement();

	return (
		<>
			<div
				className="card-product fl-item"
				key={product.id}
				style={{ position: "relative" }}
			>
				<div className="card-product-wrapper">
					<div className="canproduct d-flex">
						<div className="tf-product-info-price">
							{" "}
							{product.saleprice != 0 && product.saleprice != product.price ? (
								<div className="badges-on-sale">
									-{" "}
									<span>
										{(
											((product.price - product.saleprice) / product.price) *
											100
										).toFixed(0)}
										%
									</span>
								</div>
							) : (
								""
							)}
						</div>

						{/* <i className="fa-solid fa-heart filledfavorite"></i> */}
						<div className="favoriteclass">
							{isAddedtoWishlist(product.id) ? (
								// <i
								// 	className="fa-solid fa-heart filledfavorite"
								// 	onClick={() => addToWishlist(product.id)}
								// ></i>
								<img
									className="filledfavorite"
									src="/images/shop/products/filled_heart.svg"
									width={20}
									height={20}
									onClick={() => addToWishlist(product.id)}
								/>
							) : (
								// <i
								// 	className="fa-regular fa-heart favorite"
								// 	onClick={() => addToWishlist(product.id)}
								// ></i>
								<img
									className="favorite"
									src={
										isHovered
											? "/images/shop/products/heart_hover.svg"
											: "/images/shop/products/heart.svg"
									}
									width={20}
									height={20}
									onClick={() => addToWishlist(product.id)}
									onMouseEnter={() => setIsHovered(true)}
									onMouseLeave={() => setIsHovered(false)}
								/>
							)}
						</div>
					</div>
					{/* <Link href={`/product-detail/${product.id}`} className="product-img">
            {<ProductImageSlideshow product={product} images={imagesArray} />}
          </Link> */}
					<img
						className="filledfavorite"
						src={product.imgSrc}
						width={20}
						height={20}
						onClick={() => addToWishlist(product.id)}
					/>
					<div className="list-product-btn hidemob">
						<a
							href="#quick_add"
							onClick={() => setQuickAddItem(product.id)}
							data-bs-toggle="modal"
							className=" box-icon bg_white quick-add tf-btn-loading"
							style={{ width: "100%" }}
						>
							<div className="mainfont">ნახვა</div>
						</a>
						{/* <a
						href="#quick_add"
						onClick={() => setQuickAddItem(product.id)}
						data-bs-toggle="modal"
						className="box-icon bg_white quick-add tf-btn-loading"
					>
						
						<i className="fa-solid fa-eye"></i>
						<span className="tooltip mainfont"> ნახვა</span>
					</a> */}
						{/* <a
						onClick={() => addToWishlist(product.id)}
						className="box-icon bg_white wishlist btn-icon-action"
					>
						<span
							className={`icon icon-heart ${
								isAddedtoWishlist(product.id) ? "added" : ""
							}`}
						/>
						<span className="tooltip mainfont">
							{isAddedtoWishlist(product.id)
								? "უკვე დამატებულია"
								: "სურვილების სიაში დამატება"}
						</span>
						<span className="icon icon-delete" />
					</a> */}
					</div>
					{/* {product.countdown && (
					<div className="countdown-box">
						<div className="js-countdown">
							<CountdownComponent />
						</div>
					</div>
				)}
				{product.sizes && (
					<div className="size-list">
						{product.sizes.map((size) => (
							<span key={size}>{size}</span>
						))}
					</div>
				)}  */}
				</div>

				<div className="card-product-info">
					<div className="price d-flex">
						<div className="activeprice">
							{product.saleprice != 0 ? product.saleprice : ""}
						</div>
						<div className="pl-2">
							{product.saleprice != 0 && product.saleprice != product.price ? (
								<del className="oldprice " style={{ marginLeft: "5px" }}>
									{" "}
									{product.price} ₾
								</del>
							) : (
								<div>{product.price} ₾</div>
							)}
						</div>
					</div>
					<Link href={`/product-detail/${product.id}`} className="title link">
						{product.title}
					</Link>
					{/* {product.colors && (
					<ul className="list-color-product">
						{product.colors.map((color) => (
							<li
								className={`list-color-item color-swatch ${
									currentImage == color.imgSrc ? "active" : ""
								} `}
								key={color.name}
								onMouseOver={() => setCurrentImage(color.imgSrc)}
							>
								<span className="tooltip">{color.name}</span>
								<span className={`swatch-value ${color.colorClass}`} />
								<Image
									className="lazyload"
									data-src={color.imgSrc}
									src={color.imgSrc}
									alt="image-product"
									width={720}
									height={1005}
								/>
							</li>
						))}
					</ul>
				)} */}
					{
						<>
							{isAddedToCartProducts(product?.id) ? (
								// <Link href={`/view-cart`}>
								// 	<div className="lightdiv">კალათაშია</div>
								// </Link>
								<>
									{/* {showToast("This is a success message!")} */}
									<MainPageQuantity
										addProduct={() =>
											product?.id && addProductToCart(product?.id)
										}
										minusFunc={() => removeFromCart(product?.id)}
										AddedCartProductQuantity={AddedCartProductQuantity(
											product?.id
										)}
									/>
								</>
							) : (
								// : loadAddCart ? (
								// 	<ClipLoader color="#bf00ff" size={40} />
								// )

								<button
									type="button"
									onClick={() => product?.id && addProductToCart(product.id)}
									className="btn mainbutton"
								>
									დამატება
									{/* <span
										className="icon icon-bag"
										style={{ marginLeft: "5px" }}
									/> */}
									<img
										src="/images/shop/products/cart.svg"
										style={{ marginLeft: "5px" }}
									/>
								</button>
							)}
						</>
					}
				</div>
			</div>
			{/* <AutoSwiper images={imagesArray} width={"200"} height={"150"} /> */}
		</>
	);
};
