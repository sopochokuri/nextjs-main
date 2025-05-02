"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Quantity from "../shopDetails/Quantity";
import { useContextElement } from "@/context/Context";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import { allProducts } from "@/data/products";
import { colors, sizeOptions } from "@/data/singleProductOptions";
import { Oneproduct } from "@/services/Api";
import MainPageQuantity from "../shopDetails/MainPageQuantity";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function QuickAdd() {
	const {
		quickAddItem,
		addProductToCart,
		isAddedToCartProducts,
		addToCompareItem,
		isAddedtoCompareItem,
		addToWishlist,
		isAddedtoWishlist,
		AddedCartProductQuantity,
		removeFromCart,
	} = useContextElement();

	const [item, setItem] = useState(allProducts[0]);
	const [isLoaded, setLoaded] = useState(false);
	const [imagesArray, setImagesArray] = useState([]);

	const [myQuantity, setmyQuantity] = useState(1);

	useEffect(() => {
		if (quickAddItem && quickAddItem > 0 && quickAddItem != 1) {
			Oneproduct(quickAddItem).then((res) => {
				setLoaded(false);
				setImagesArray(res?.images);
				if (Array.isArray(res?.images) && res?.images.length > 0) {
					res.image = `https://digital-cms.ge/${res.images[0].file_name}`;
				}
				if (res?.id == quickAddItem) {
					setLoaded(true);
				}
				setItem(res);
			});
		}

		// const filtered = allProducts.filter((el) => el.id == quickAddItem);
		// if (filtered) {
		// 	setItem(filtered[0]);
		// }
	}, [quickAddItem]);
	const [currentColor, setCurrentColor] = useState(colors[0]);
	const [currentSize, setCurrentSize] = useState(sizeOptions[0]);

	return (
		<div className="modal fade modalDemo paddingtopdiv" id="quick_add">
			<div className="modal-dialog modal-dialog-centered ">
				<div className="modal-content">
					<div className="header">
						<span
							className="icon-close icon-close-popup"
							data-bs-dismiss="modal"
							onClick={() => setLoaded(false)}
						/>
					</div>
					{/* <DetailsOuterZoom product={product} /> */}
					<div className="wrap ">
						<div className="tf-product-info-item d-flex">
							{isLoaded ? (
								<div className="image col-md-6 text-center">
									{/* <Image
										alt="image"
										src={item?.image}
										width={720}
										height={1005}
									/> */}
									<Swiper
										modules={[Navigation, Autoplay, Pagination]}
										spaceBetween={10}
										slidesPerView={1}
										navigation
										// autoplay={{ delay: 3000 }}
										pagination={{ clickable: true }}
										className="my-swiper"
									>
										{imagesArray?.map((image, index) => (
											<SwiperSlide key={index}>
												<img
													src={`https://digital-cms.ge/${image?.file_name}`}
													alt={`Slide ${index + 1}`}
													className="slider-image"
												/>
											</SwiperSlide>
										))}
									</Swiper>
								</div>
							) : (
								<div className="image col-md-6 emptyimage">
									<Image
										className=" lazyload "
										src="/images/products/product1.jpg"
										alt="image-product"
										style={{ opacity: 0 }}
										width={416}
										height={499}
									/>
								</div>
							)}
							<div className="content col-md-6">
								<Link href={`/product-detail/${item?.id}`} className="mainfont">
									{item?.title}
								</Link>
								<div className="tf-product-info-price">
									<div className="price-on-sale">
										{item?.saleprice != -1 && item?.saleprice != item?.price
											? item?.saleprice
											: item?.price}{" "}
										₾
									</div>
									{item?.saleprice != 0 && item?.saleprice != item?.price ? (
										<div className="price-on-sale">
											<del style={{ color: "#707070" }}>{item?.price}</del>
										</div>
									) : (
										""
									)}

									{/* <div className="compare-at-price">
											${currentColor.oldPrice}
										</div> */}

									{item?.saleprice != 0 && item?.saleprice != item?.price ? (
										<div className="badges-on-sale">
											<span>
												{(
													((item?.price - item?.saleprice) / item?.price) *
													100
												).toFixed(0)}
											</span>
											% OFF
										</div>
									) : (
										""
									)}
								</div>
								<div className="tf-product-info-variant-picker mb_15 mt-3">
									{/* <div className="variant-picker-item">
										<div className="variant-picker-label">
											Color:
											<span className="fw-6 variant-picker-label-value">
												{currentColor.value}
											</span>
										</div> 
										<form className="variant-picker-values">
											{colors.map((color) => (
												<React.Fragment key={color.id}>
													<input
														type="radio"
														name="color1"
														readOnly
														checked={currentColor == color}
													/>
													<label
														onClick={() => setCurrentColor(color)}
														className="hover-tooltip radius-60"
														data-value={color.value}
													>
														<span
															className={`btn-checkbox ${color.className}`}
														/>
														<span className="tooltip">{color.value}</span>
													</label>
												</React.Fragment>
											))}
										</form>
										
									</div>*/}
									<div className="variant-picker-item">
										<div className="variant-picker-label mainfont">
											ზომა:{" "}
											<span className="fw-6 variant-picker-label-value">
												{" "}
												{currentSize.value}
											</span>
										</div>
										<form className="variant-picker-values">
											{sizeOptions.map((size) => (
												<React.Fragment key={size.id}>
													<input
														type="radio"
														name="size1"
														readOnly
														checked={currentSize == size}
													/>
													<label
														onClick={() => setCurrentSize(size)}
														className="style-text"
														data-value={size.value}
													>
														<p>{size.value}</p>
													</label>
												</React.Fragment>
											))}
										</form>
									</div>
								</div>{" "}
								<div className="quantity-title fw-6 mainfont">რაოდენობა</div>
								<div className="tf-product-info-quantity mb_15 d-flex">
									<div className="col-md-4">
										{isAddedToCartProducts(item?.id) ? (
											<MainPageQuantity
												addProduct={() =>
													item?.id && addProductToCart(item?.id)
												}
												minusFunc={() => removeFromCart(item?.id)}
												AddedCartProductQuantity={AddedCartProductQuantity(
													item?.id
												)}
											/>
										) : (
											<div className="mainpagecount wg-quantity ">
												<a
													type="button"
													onClick={() => item?.id && addProductToCart(item?.id)}
													className="btn mainbutton  mainfont d-flex justify-content-center"
													style={{
														fontSize: "14px",
														width: "100% ",
														lineHeight: "20px",
													}}
												>
													დამატება{" "}
													<img
														src="/images/shop/products/cart.svg"
														style={{ marginLeft: "5px" }}
													/>
												</a>
											</div>
										)}
									</div>

									{/* {isLoaded && (
										<Quantity
											setmyQuantity={setmyQuantity}
											isLoaded={isLoaded}
											initialQuantity={AddedCartProductQuantity(item?.id)}
										/>
									)} */}
									<div className="tf-product-btn-wishlist col-md-4">
										<a onClick={() => addToWishlist(item?.id)} className="">
											<i
												className={`${
													isAddedtoWishlist(item?.id) ? "added" : "noadded"
												}`}
											/>
											<span className="tooltip">
												{" "}
												{isAddedtoWishlist(item?.id)
													? "Already Wishlisted"
													: "Add to Wishlist"}
											</span>
										</a>
									</div>
								</div>
								{/* <div className="tf-product-info-buy-button">
									<form onSubmit={(e) => e.preventDefault()} className="">
										<a
											className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
											onClick={() => addProductToCart(item?.id)}
										>
											<span className="mainfont">
												{!isAddedToCartProducts(item?.id) ? (
													<>
														კალათაში დამატება -{" "}
														<span className="tf-qty-price">
															{isLoaded
																? item?.saleprice !== 0 &&
																  item?.saleprice !== item?.price
																	? `${item?.saleprice * myQuantity} ₾`
																	: `${item?.price * myQuantity} ₾`
																: ""}
														</span>
													</>
												) : (
													<div>კალათაში დამატებულია</div>
												)}
											</span>
										</a>

										<div className="tf-product-btn-wishlist ">
											<a onClick={() => addToWishlist(item?.id)} className="">
												<i
													className={`icon icon-heart ${
														isAddedtoWishlist(item?.id) ? "added" : ""
													}`}
												/>
												<span className="tooltip">
													{" "}
													{isAddedtoWishlist(item?.id)
														? "Already Wishlisted"
														: "Add to Wishlist"}
												</span>
											</a>
										</div>
										<a
											href="#compare"
											data-bs-toggle="offcanvas"
											aria-controls="offcanvasLeft"
											onClick={() => addToCompareItem(item?.id)}
											className="tf-product-btn-wishlist box-icon bg_white compare btn-icon-action"
										>
											<span className="icon icon-compare" />
											<span className="icon icon-check" />
										</a> 
									 <div className="w-100">
											<a href="#" className="btns-full">
												Buy with
												<Image
													alt="image"
													src="/images/payments/paypal.png"
													width={64}
													height={18}
												/>
											</a>
											<a href="#" className="payment-more-option">
												More payment options
											</a>
										</div> 
									</form>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
