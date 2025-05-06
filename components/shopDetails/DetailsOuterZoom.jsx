import React, { useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import CountdownComponent from "../common/Countdown";
import Tooltip from "@/components/shopDetails/Tooltip";

import { colors, sizeOptions } from "@/data/singleProductOptions";
import Quantity from "./Quantity";

import Slider1ZoomOuter from "./sliders/Slider1ZoomOuter";

import { useContextElement } from "@/context/Context";
import { openCartModal } from "@/utlis/openCartModal";
import DescriptionModal from "@/components/modals/DescriptionModal";

export default function DetailsOuterZoom({ product }) {
  let image = "";
  if (Array.isArray(product?.images) && product?.images.length > 0) {
    image = `https://digital-cms.ge/${product.images[0].file_name}`;
  }

  const {
    addProductToCart,
    isAddedToCartProducts,

    addToWishlist,
    isAddedtoWishlist,
    AddedCartProductQuantity,
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
  const productGroup = Array.isArray(product?.product_group)
    ? product.product_group
    : [];

  const [currentImageOption, setCurrentImageOption] = useState(
    productGroup[0] ?? null
  );
  const useSlider = productGroup.length > 6;

  //const [currentSize, setCurrentSize] = useState(sizeOptions[1]);
  // const [currentSize, setCurrentSize] = useState(product?.product_sizes_array?.[0] || "");
  const [currentSize, setCurrentSize] = useState(
    product?.product_sizes_array?.[0] || ""
  );

  const [quantity, setQuantity] = useState(
    AddedCartProductQuantity(product?.id)
  );

  console.log("qq", quantity);

  const handleColor = (color) => {
    const updatedColor = colors.filter(
      (elm) => elm.value.toLowerCase() === color?.toLowerCase()
    )[0];
    if (updatedColor) {
      setCurrentColor(updatedColor);
    }
  };

  const { cartProducts, setCartProducts, totalPrice } = useContextElement();

  const removeItem = (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id !== id)]);
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
                    imageslist={product?.images || []}
                    firstImage={image}
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
                  <div className="tf-product-info-badges">
                    <div className="badges mainfont">Best seller</div>
                    <div className="product-status-content">
                      <i className="icon-lightning" />
                      <p className="fw-6 mainfont">
                        იჩქარე! აქციის მარაგი იწურება.
                      </p>
                    </div>
                  </div>
                  <div className="tf-product-info-price">
                    <div className="price-on-sale">
                      ₾
                      {product?.saleprice !== -1 &&
                      product?.saleprice !== product?.price
                        ? product?.saleprice
                        : product?.price}{" "}
                    </div>
                    {product?.saleprice !== 0 &&
                    product?.saleprice !== product?.price ? (
                      <div className="price-on-sale">
                        <del style={{ color: "#707070" }}>{product?.price}</del>
                      </div>
                    ) : (
                      ""
                    )}
                    {product?.saleprice !== 0 &&
                    product?.saleprice !== product?.price ? (
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
                  <div className="tf-product-info-countdown">
                    <div className="countdown-wrap">
                      <div className="countdown-title">
                        <i className="icon-time tf-ani-tada" />
                        <h8 className="mainfont">იჩქარე! აქცია სრულდება:</h8>
                      </div>
                      <div className="tf-countdown style-1">
                        <div className="js-countdown mainfont">
                          {product?.sale_edate && (
                            <CountdownComponent endDate={product?.sale_edate} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tf-product-info-variant-picker">
                    <div className="variant-picker-item">
                      {useSlider ? (
                        <Slider
                          slidesToShow={6}
                          slidesToScroll={2}
                          arrows={true}
                          infinite={false}
                          speed={500}
                          nextArrow={<CustomNextArrow />}
                          prevArrow={<CustomPrevArrow />}
                        >
                          {(product?.product_group || []).map((option) => (
                            <div key={option.id}>
                              <input
                                type="radio"
                                name="image"
                                id={option.id}
                                readOnly
                                checked={option === currentImageOption}
                                style={{ display: "none" }}
                              />
                              <Tooltip
                                className="tooltip-portal"
                                tooltipContent={
                                  <>
                                    <img
                                      className="group-img"
                                      src={`https://digital-cms.ge${option.images?.file_name}`}
                                      alt={option.title}
                                      style={{
                                        maxWidth: 150,
                                        height: "auto",
                                        marginBottom: 4,
                                      }}
                                    />
                                    <div>
                                      <span className="mainfont group_title">
                                        {option.title}
                                      </span>
                                      <div className="tf-product-info-price">
                                        <div className=" mainfont group_price">
                                          ₾
                                          {option?.saleprice !== -1 &&
                                          option?.saleprice !== option?.price
                                            ? option?.saleprice
                                            : option?.price}{" "}
                                        </div>
                                        {option?.saleprice !== 0 &&
                                        option?.saleprice !== option?.price ? (
                                          <div className="mainfont">
                                            <del style={{ color: "#707070" }}>
                                              {option?.price}
                                            </del>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </>
                                }
                              >
                                <label
                                  onClick={() => setCurrentImageOption(option)}
                                  className="style-image"
                                  htmlFor={option.id}
                                  data-value={option.value}
                                >
                                  <div className="image">
                                    <Link
                                      href={`/product-detail/${option.id}`}
                                      className="image"
                                    >
                                      <Image
                                        className="group-img"
                                        src={`https://digital-cms.ge${option.images?.file_name}`}
                                        alt={option.title}
                                        width={100}
                                        height={100}
                                        objectFit="cover"
                                      />
                                    </Link>
                                  </div>
                                </label>
                              </Tooltip>
                            </div>
                          ))}
                        </Slider>
                      ) : (
                        <form className="variant-picker-values">
                          {(product?.product_group || []).map((option) => (
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
                                <span className="tooltip">{option.title}</span>
                              </label>
                            </React.Fragment>
                          ))}
                        </form>
                      )}
                    </div>
                  </div>

                  <div className="tf-product-info-liveview">
                    <p className="fw-8 info-line">
                      <span className="label"> ბარკოდი:</span>
                      <span className="font-normal mainfont">
                        {product?.barcode}
                      </span>
                    </p>
                  </div>
                  <div className="tf-product-info-liveview">
                    <p className="fw-8 info-line">
                      <span className="label"> ბრენდი:</span>
                      <Link
                        href={`/product-brand/${product?.brand_id}`}
                        className="linkcolor mainfont"
                      >
                        {product?.brand_name?.full_name}
                      </Link>
                    </p>
                  </div>
                  <div className="tf-product-info-liveview">
                    <p className="fw-8 info-line">
                      <span className="label">კატეგორია:</span>
                      <Link
                        href={`/product-catalog/${product?.collection_id}`}
                        className="linkcolor mainfont"
                      >
                        {product?.category_name?.title}
                      </Link>
                    </p>
                  </div>

                  {/* <div className="tf-product-info-liveview">
                    <p className="fw-8 info-line">
                      <span className="label"> მაღაზია:</span>
                      <span className="font-normal">
                        {product?.shop_name?.name}
                      </span>
                    </p>
                  </div> */}

                  <div className="tf-product-info-liveview">
                    <p className="fw-8 info-line">
                      <span className="label"> რაოდენობა:</span>
                      <span
                        className="font-normal mainfont"
                        style={{
                          color: product?.amount_in_stock > 1 ? "black" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {product?.amount_in_stock > 1
                          ? product?.amount_in_stock
                          : "არ არის მარაგში"}
                      </span>
                    </p>
                  </div>
                  {product?.size && (
                    <div className="tf-product-info-liveview">
                      <p className="fw-8 info-line">
                        <span className="label"> ზომა:</span>
                        <span className="font-normal mainfont">
                          {product?.size}
                        </span>
                      </p>
                    </div>
                  )}
                  {product?.weight && (
                    <div className="tf-product-info-liveview">
                      <p className="fw-8 info-line">
                        <span className="label"> წონა:</span>
                        <span className="font-normal mainfont">
                          {product?.weight}
                        </span>
                      </p>
                    </div>
                  )}
                  {product?.volume && (
                    <div className="tf-product-info-liveview">
                      <p className="fw-8 info-line">
                        <span className="label"> მოცულობა:</span>
                        <span className="font-normal mainfont">
                          {product?.volume}
                        </span>
                      </p>
                    </div>
                  )}
                  {product?.amount_in_package && (
                    <div className="tf-product-info-liveview">
                      <p className="fw-8 info-line">
                        <span className="label"> რაოდენობა შეფუთვაში:</span>
                        <span className="font-normal mainfont">
                          {product?.amount_in_package}
                        </span>
                      </p>
                    </div>
                  )}
                  {product?.type && (
                    <div className="tf-product-info-liveview">
                      <p className="fw-8 info-line">
                        <span className="label"> ტიპი:</span>
                        <span className="font-normal mainfont">
                          {product?.type}
                        </span>
                      </p>
                    </div>
                  )}
                  <div className="tf-product-info-liveview">
                    <p className="fw-8 info-line">
                      <span className="label">მაღაზია:</span>

                      <span className="tooltip-wrapper mainfont">
                        {product?.shop_name?.name}

                        <span className="tooltip-box">
                          <p>{product?.shop_name?.name}</p>
                          <p className="fw-8 info-line">
                            <span className="label oncanshop mainfont">
                              {" "}
                              ქენშოპზეა:
                            </span>
                            <span className="font-normal oncanshop">
                              {product?.shop_details?.created_at}
                            </span>
                          </p>
                          <p className="fw-8 info-line">
                            <span className="label soldproduct mainfont">
                              {" "}
                              გაყიდული პროდუქცია:
                            </span>
                            <span className="font-normal soldproduct">
                              {product?.shop_details?.sold_product_count}
                            </span>
                          </p>
                          {/* <p className="sold-product mainfont">
                            ქენშოპზეა: {product?.shop_details?.created_at}
                          </p> */}
                          {/* <p className="sold-product mainfont">
                            გაყიდული პროდუქცია:{" "}
                            {product?.shop_details?.sold_product_count}
                          </p> */}

                          <Link
                            href={`/product-shop/${product?.shop_id}`}
                            className="tooltip-button mainfont"
                          >
                            მაღაზიის პროდუქცია სრულად
                          </Link>
                        </span>
                      </span>
                    </p>
                  </div>

                  {product?.has_gift === 1 && product?.gifts?.length > 0 && (
                    <div className="tf-product-info-liveview">
                      {product.gifts.map((gift, index) => (
                        <div key={index}>
                          <p className="fw-6">
                            საჩუქარი:{" "}
                            <span className="font-normal">{gift.title}</span>
                          </p>
                          {gift?.images?.[0]?.file_name && (
                            <img
                              src={`https://digital-cms.ge/${gift.images[0].file_name}`}
                              alt={gift.title}
                              style={{ maxWidth: "100px", marginTop: "10px" }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="productdesc">
                    <>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          openCartModal("description");
                        }}
                        className="descr"
                      >
                        იხილეთ სრულად <span className="descr_text">&gt;</span>
                      </a>

                      <DescriptionModal data={product} />
                    </>
                  </div>

                  {Array.isArray(product?.product_sizes_array) &&
                    product.product_sizes_array.some(
                      (size) => size && size.trim() !== ""
                    ) && (
                      <div className="tf-product-info-variant-picker">
                        <div className="variant-picker-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="variant-picker-label mainfont">
                              ზომა:
                              <span className="fw-6 variant-picker-label-value">
                                {currentSize.value}
                              </span>
                            </div>
                            <a
                              href="#find_size"
                              data-bs-toggle="modal"
                              className="find-size fw-6 mainfont"
                            >
                              ზომების ცხრილი
                            </a>
                          </div>

                          <form className="variant-picker-values">
                            {product.product_sizes_array.map((size, index) => (
                              <React.Fragment key={index}>
                                <input
                                  type="radio"
                                  name="size1"
                                  id={`size-${size}`}
                                  readOnly
                                  checked={currentSize === size}
                                />
                                <label
                                  onClick={() => setCurrentSize(size)}
                                  className="style-text"
                                  htmlFor={`size-${size}`}
                                  data-value={size}
                                >
                                  <p>{size}</p>
                                </label>
                              </React.Fragment>
                            ))}
                          </form>
                        </div>
                      </div>
                    )}

                  <div className="tf-product-info-quantity">
                    <div className="quantity-title fw-6 mainfont">
                      <strong>რაოდენობა</strong>
                    </div>
                    <Quantity setQuantity={setQuantity} />
                  </div>
                  <div className="tf-product-info-buy-button">
                    <form onSubmit={(e) => e.preventDefault()} className="">
                      <a
                        onClick={() => {
                          //openCartModal();
                          addProductToCart(
                            product?.id,
                            quantity ? quantity : 1
                          );
                        }}
                        className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn btn-custom"
                      >
                        <span className="mainfont">
                          {isAddedToCartProducts(product?.id)
                            ? "კალათაში დამატებულია"
                            : "კალათაში დამატება"}{" "}
                          -{" "}
                        </span>
                        <span className="tf-qty-price">
                          {product?.saleprice != 0 &&
                          product?.saleprice != product?.price
                            ? product?.saleprice
                            : product?.price}{" "}
                          ₾
                        </span>
                      </a>

                      <a
                        onClick={() => addToWishlist(product?.id)}
                        className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action"
                      >
                        <span
                          className={`icon icon-heart ${
                            isAddedtoWishlist(product?.id) ? "added" : ""
                          }`}
                        />
                        <span className="tooltip">
                          {" "}
                          {isAddedtoWishlist(product?.id)
                            ? "Already Wishlisted"
                            : "Add to Wishlist"}
                        </span>
                        <span className="icon icon-delete" />
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
