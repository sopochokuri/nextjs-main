"use client";
import React, { useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import CountdownComponent from "../common/Countdown";
import {
  colors,
  imageOptions,
  paymentImages,
  sizeOptions,
} from "@/data/singleProductOptions";
import StickyItem from "./StickyItem";
import Quantity from "./Quantity";

import Slider1ZoomOuter from "./sliders/Slider1ZoomOuter";
import { allProducts } from "@/data/products";

import { useContextElement } from "@/context/Context";
import { openCartModal } from "@/utlis/openCartModal";
//import DescriptionModal from "./modals/DescriptionModal"; // Import the modal component
import DescriptionModal from "@/components/modals/DescriptionModal";
import MainPageQuantity from "../shopDetails/MainPageQuantity";
import Countdown from "../homes/home-3/Countdown";

// export default function DetailsOuterZoom({ product = allProducts[0] }) {
export default function DetailsOuterZoom({ product }) {
  let image = "";
  if (Array.isArray(product?.images) && product?.images.length > 0) {
    image = `https://digital-cms.ge/${product.images[0].file_name}`;
  }
  const {
    addProductToCart,
    isAddedToCartProducts,
    addToCompareItem,
    isAddedtoCompareItem,
    addToWishlist,
    isAddedtoWishlist,
    AddedCartProductQuantity,
    removeFromCart,
  } = useContextElement();
  const CustomNextArrow = ({ onClick }) => {
    return (
      <div
        className="custom-arrow custom-next"
        onClick={onClick}
        role="button"
        aria-label="Next slide"
      >
        <svg
          width="7"
          height="11"
          viewBox="0 0 7 11"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.5 11L7 5.5L1.5 0L0.52375 0.97625L5.0475 5.5L0.52375 10.0238L1.5 11Z" />
        </svg>
      </div>
    );
  };

  const CustomPrevArrow = ({ onClick }) => {
    return (
      <div
        className="custom-arrow custom-prev"
        onClick={onClick}
        role="button"
        aria-label="Previous slide"
      >
        <svg
          width="7"
          height="11"
          viewBox="0 0 7 11"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(180deg)" }}
        >
          <path d="M1.5 11L7 5.5L1.5 0L0.52375 0.97625L5.0475 5.5L0.52375 10.0238L1.5 11Z" />
        </svg>
      </div>
    );
  };

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentImageOption, setCurrentImageOption] = useState(imageOptions[0]);
  const [currentSize, setCurrentSize] = useState(sizeOptions[1]);
  const [quantity, setQuantity] = useState(
    AddedCartProductQuantity(product?.id)
  );

  console.log("qq", quantity);

  const handleColor = (color) => {
    const updatedColor = colors.filter(
      (elm) => elm.value.toLowerCase() == color?.toLowerCase()
    )[0];
    if (updatedColor) {
      setCurrentColor(updatedColor);
    }
  };

  const { cartProducts, setCartProducts, totalPrice } = useContextElement();

  //   const setQuantity = (id, quantity) => {
  //     // if (quantity >= 1) {
  //     //   const item = cartProducts.filter((elm) => elm.id == id)[0];
  //     //   const items = [...cartProducts];
  //     //   const itemIndex = items.indexOf(item);
  //     //   item.quantity = quantity;
  //     //   items[itemIndex] = item;
  //     //   setCartProducts(items);
  //     // }

  //   };
  const removeItem = (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  };

  return (
    <section
      className="flat-spacing-4 pt_0"
      style={{ maxWidth: "100vw", overflow: "clip" }}
    >
      <div
        className="tf-main-product section-image-zoom"
        style={{ maxWidth: "100vw", overflow: "clip" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="thumbs-slider text-center">
                  <Slider1ZoomOuter
                    handleColor={handleColor}
                    currentColor={currentColor.value}
                    imageslist={product?.images}
                    firstImage={`${image}`}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-title mainfont">
                    <h6 className="maintitle">
                      {product?.title_web ? (
                        product.title_web
                      ) : (
                        <div className="emptyimage">&nbsp;</div>
                      )}
                    </h6>
                  </div>
                  {
                    <div className="tf-product-info-badges">
                      <div className="badges mainfont">Best seller</div>
                      <div className="product-status-content">
                        <i className="icon-lightning" />
                        <p className="fw-6 mainfont">
                          იჩქარე! აქციის მარაგი იწურება.
                        </p>
                      </div>
                    </div>
                  }
                  <div className="tf-product-info-price">
                    <div className="price-on-sale">
                      ₾
                      {product?.saleprice != -1 &&
                      product?.saleprice != product?.price
                        ? product?.saleprice
                        : product?.price}{" "}
                    </div>
                    {product?.saleprice != 0 &&
                    product?.saleprice != product?.price ? (
                      <div className="price-on-sale">
                        <del style={{ color: "#707070" }}>{product?.price}</del>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* <div className="compare-at-price">
											${currentColor.oldPrice}
										</div> */}
                    {product?.saleprice != 0 &&
                    product?.saleprice != product?.price ? (
                      <div className="badges-on-sale">
                        <span>
                          {(
                            ((product?.price - product?.saleprice) /
                              product?.price) *
                            100
                          ).toFixed(0)}
                        </span>
                        % OFF
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <div className="tf-product-info-liveview"></div> */}
                  {
                    <div className="tf-product-info-countdown">
                      <div className="countdown-wrap">
                        <div className="countdown-title">
                          <i className="icon-time tf-ani-tada" />
                          <h8 class="mainfont">იჩქარე! აქცია სრულდება:</h8>
                        </div>
                        <div className="tf-countdown style-1">
                          <div className="js-countdown mainfont">
                            {/* <CountdownComponent
                              labels="Days :,Hours :,Mins :"
                              targetDate={product.sale_end_text}
                            /> */}
                            {product?.sale_edate && (
                              <CountdownComponent
                                endDate={product?.sale_edate}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  }

                  <div className="tf-product-info-variant-picker">
                    <div className="variant-picker-item">
                      {/* <div className="variant-picker-label">
                        აირჩიეთ:
                        <span className="fw-6 variant-picker-label-value">
                          {currentImageOption.title}
                        </span>
                      </div> */}

                      {Array.isArray(product?.product_group) &&
                      product.product_group.length > 0 ? (
                        product.product_group.length > 6 ? (
                          <Slider
                            slidesToShow={6}
                            slidesToScroll={2}
                            arrows={true}
                            infinite={false}
                            speed={500}
                            nextArrow={<CustomNextArrow />}
                            prevArrow={<CustomPrevArrow />}
                          >
                            {product.product_group.map((option) => (
                              <div key={option.id}>
                                <input
                                  type="radio"
                                  name="image"
                                  id={option.id}
                                  readOnly
                                  checked={option === currentImageOption}
                                  style={{ display: "none" }}
                                />
                                <label
                                  onClick={() => setCurrentImageOption(option)}
                                  className="style-image hover-tooltip"
                                  htmlFor={option.id}
                                  data-value={option.value}
                                >
                                  <div className="image">
                                    <Link
                                      href={`/product-detail/${option.id}`}
                                      className="image"
                                    >
                                      <Image
                                        className="lazyload"
                                        src={`https://digital-cms.ge${option.images?.file_name}`}
                                        alt={option.title}
                                        width={100}
                                        height={100}
                                        objectFit="cover"
                                      />
                                    </Link>
                                  </div>
                                  <label
                                    className="style-image hover-tooltip"
                                    htmlFor={option.id}
                                  >
                                    <span className="tooltip">
                                      <img
                                        src={`https://digital-cms.ge${option.images?.file_name}`}
                                        alt={option.title}
                                        style={{
                                          width: "150px",
                                          height: "auto",
                                        }}
                                      />
                                      <div>{option.title}</div>
                                    </span>
                                  </label>
                                </label>
                              </div>
                            ))}
                          </Slider>
                        ) : (
                          <form className="variant-picker-values">
                            {product.product_group.map((option) => (
                              <React.Fragment key={option.id}>
                                <input
                                  type="radio"
                                  name="image"
                                  id={option.id}
                                  readOnly
                                  checked={option === currentImageOption}
                                />
                                <label
                                  onClick={() => setCurrentImageOption(option)}
                                  className="style-image hover-tooltip"
                                  htmlFor={option.id}
                                  data-value={option.value}
                                >
                                  <a href="#">
                                    <div className="image">
                                      <Image
                                        className="lazyload"
                                        src={`https://digital-cms.ge${option.images?.file_name}`}
                                        alt={option.title}
                                        width={75}
                                        height={75}
                                      />
                                    </div>
                                  </a>
                                  <span className="tooltip">
                                    {option.title}
                                  </span>
                                </label>
                              </React.Fragment>
                            ))}
                          </form>
                        )
                      ) : (
                        <p>არ არის დაჯგფება</p>
                      )}
                    </div>
                  </div>
                  {/* <div className="productdesc">{product?.meta_description}</div> */}
                  <div className="tf-product-info-liveview"></div>
                  <div className="tf-product-info-liveview">
                    <div className="fw-6">
                      <p className="fw-6">
                        ბრენდი:{" "}
                        <Link
                          href={`/product-brand/${product?.brand_id}`}
                          className="linkcolor"
                        >
                          {product?.brand_name?.full_name}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="tf-product-info-liveview">
                    <p className="fw-6">
                      პროდუქტის კოდი:{" "}
                      <span className="font-normal">{product?.route}</span>
                    </p>
                  </div>
                  <div className="tf-product-info-liveview">
                    <p className="fw-6">
                      მაღაზია:{" "}
                      <span className="font-normal">
                        {product?.shop_name?.name}
                      </span>
                    </p>
                  </div>
                  <div className="tf-product-info-liveview">
                    <p className="fw-6">
                      ხელმისაწვდომია:{" "}
                      <span
                        className="font-normal"
                        style={{
                          color:
                            product?.amount_in_stock === 1 ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {product?.amount_in_stock === 1
                          ? "მარაგშია"
                          : "არ არის მარაგში"}
                      </span>
                    </p>
                  </div>

                  <div className="tf-product-info-liveview">
                    {product?.has_gift === 1 &&
                      product?.gifts?.map((gift, index) => (
                        <p className="fw-6" key={index}>
                          საჩუქარი:{" "}
                          <span className="font-normal">{gift.title}</span>
                          {gift?.images?.[0]?.file_name && (
                            <img
                              src={`https://digital-cms.ge/${gift.images[0].file_name}`}
                              alt={gift.title}
                              style={{ maxWidth: "100px", marginTop: "10px" }}
                            />
                          )}
                        </p>
                      ))}
                  </div>
                  <div className="productdesc">
                    <>
                      <a
                        onClick={() => openCartModal("description")}
                        className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                      >
                        აღწერა
                      </a>

                      <DescriptionModal data={product?.description} />
                    </>
                  </div>
                  {
                    <div className="tf-product-info-variant-picker">
                      <div className="variant-picker-item">
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
                                id={color.id}
                                type="radio"
                                name="color1"
                                readOnly
                                checked={currentColor == color}
                              />
                              <label
                                onClick={() => setCurrentColor(color)}
                                className="hover-tooltip radius-60"
                                htmlFor={color.id}
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
                      </div>
                      <div className="variant-picker-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="variant-picker-label">
                            Size:
                            <span className="fw-6 variant-picker-label-value">
                              {currentSize.value}
                            </span>
                          </div>
                          <a
                            href="#find_size"
                            data-bs-toggle="modal"
                            className="find-size fw-6"
                          >
                            Find your size
                          </a>
                        </div>
                        <form className="variant-picker-values">
                          {sizeOptions.map((size) => (
                            <React.Fragment key={size.id}>
                              <input
                                type="radio"
                                name="size1"
                                id={size.id}
                                readOnly
                                checked={currentSize == size}
                              />
                              <label
                                onClick={() => setCurrentSize(size)}
                                className="style-text"
                                htmlFor={size.id}
                                data-value={size.value}
                              >
                                <p>{size.value}</p>
                              </label>
                            </React.Fragment>
                          ))}
                        </form>
                      </div>
                    </div>
                  }
                  <div className="tf-product-info-quantity">
                    {/* Flex container for quantity and favorites */}
                    <div className="d-flex  align-items-center addcnt">
                      {/* MainPageQuantity Component */}
                      {isAddedToCartProducts(product?.id) ? (
                        <>
                          {/* <div className="quantity-title fw-6 mainfont">
                            <strong>რაოდენობა</strong>
                          </div> */}
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
                        <div className="mainpagecount wg-quantity ">
                          <a
                            type="button"
                            onClick={() =>
                              product?.id && addProductToCart(product?.id)
                            }
                            className="btn mainbutton  mainfont d-flex justify-content-center"
                            style={{
                              "font-size": "14px",
                              width: "100% ",
                              "line-height": "20px",
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

                      {/* Favorites Button */}
                      <a
                        onClick={() => addToWishlist(product?.id)}
                        className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action"
                      >
                        <span
                          className={` ${
                            isAddedtoWishlist(product?.id) ? "added" : "noadded"
                          }`}
                        />
                        <span className="tooltip">
                          {isAddedtoWishlist(product?.id)
                            ? "Already Wishlisted"
                            : "Add to Wishlist"}
                        </span>
                        <span className="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* <StickyItem /> */}
    </section>
  );
}
