"use client";
import React from "react";
import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";
import CartLength from "../common/CartLength";
import WishlistLength from "../common/WishlistLength";
import { debounce } from "@/helpers/debounce";
import HomeListReducer from "@/store/HomeListReducer";
import { useReducer, useState, useRef } from "react";
import { filterproducts } from "@/services/Api";
import { ClipLoader, DotLoader } from "react-spinners";
import Cookies from "js-cookie";
import Profile from "../common/Profile";
import { useContextElement } from "@/context/Context";

export default function Header1() {
	const { token } = useContextElement();

	const inputRef = useRef(null);
	const initialState = {
		loadmore: false,
		data: [],
		productslenght: 0,
		loadingdata: true,
	};
	const [state, dispatch] = useReducer(HomeListReducer, initialState);
	const [dropdata, setDropdata] = useState(false);
	const [nodata, setNodata] = useState(false);
	const fetchData = async (keyword) => {
		try {
			const products = await filterproducts(keyword);

			if (products.length > 0) {
				setDropdata(true);
				dispatch({ type: "SET_FILTER", payload: products });
				setNodata(false);
			} else {
				setDropdata(false);
				setNodata(true);
			}
		} catch (error) {
			setDropdata(false);
			console.error("Failed to fetch products:", error);
		} finally {
			// Ensure loading is set to false in all cases
		}
	};

	const handleClick = () => {
		window.location.href = `/product-filter-all/${inputRef.current.value}`;
	};

	const onSearch = debounce(({ target }) => {
		if (target.value.length > 3) {
			//setLoading(true);
			const timer = setTimeout(() => {
				fetchData(target.value);
			}, 1000);
			return () => {
				clearTimeout(timer);
			};
		} else {
			setDropdata(false);
			setNodata(false);

			// if (state.filter) {
			// 	dispatch({
			// 		type: CLEAR_FILTER,
			// 	});
			// }
		}
	});
	return (
		<header id="header" className="header-default header-absolute sticky">
			<div className="px_15 lg-px_40 header-top-menu">
				<div className="row pt-2 d-flex align-items-center justify-space-between">
					<div className="col-2 d-none">გატანის წერტილები</div>
					<div className="col-4"></div>
					<div className="col text-end">გაყიდე ქენშოპზე</div>
					<div className="col text-end">კონფიდენციალურობა</div>
					<div className="col text-end">მიწოდების პირობები</div>
					<div className="col text-end">ანგარიშსწორება</div>
					<div className="col text-end">
						<Link
							href={`/contact-2`}
							className="tf-btn radius-3 btn-fill animate-hover-btn justify-content-center"
						>
							კონტაქტი
						</Link>
					</div>
				</div>
			</div>
			<div className="px_15 lg-px_40">
				<div className="row wrapper-header d-sm-none align-items-center">
					<div className="col-12 d-sm-none text-start mainfont text-white">
						ცხელი ხაზი: 551599275
					</div>
				</div>
				<div className="row wrapper-header align-items-center">
					{/* Logo - Full width on mobile, 2 columns on sm+ */}
					<div className="col-6 col-sm-2">
						<Link href={`/`} className="logo-header">
							<img
								alt="logo"
								className="logo"
								src="/images/logo/canshop_logo.png"
								style={{
									width: "170px",
									height: "auto",
								}}
							/>
						</Link>
					</div>

					{/* Mobile Menu Button - Visible on mobile */}
					<div className="col-6  col-sm-1 text-mobile-end">
						<a
							href="#mobileMenu"
							data-bs-toggle="offcanvas"
							aria-controls="offcanvasLeft"
						>
							<button
								className="nav-element__burger j-menu-burger-btn j-wba-header-item"
								data-wba-header-name="Catalog"
								type="button"
							>
								<span className="nav-element__burger-line"></span>
							</button>
						</a>
					</div>

					{/* Search Input - Hidden on mobile */}
					<div className="col-sm-7 searchparent d-none d-sm-block p-0">
						<input
							autoComplete="off"
							className="form-control search-content-mobile-input"
							type="text"
							id="q1"
							name="searchTerm"
							ref={inputRef}
							onKeyUp={onSearch}
							placeholder="რის შეძენას აპირებ?"
						/>
						{dropdata ? (
							<ul className="searchdrop dropdown-menu show mt-1">
								{state.loadingdata && (
									<li className="searchtitle text-center p-2">
										<ClipLoader color="#bf00ff" size={40} />
									</li>
								)}
								{state.data.map((item, index) => (
									<li key={index}>
										<div className="searchdiv">
											<div className="searchimg">
												<img
													src={`https://digital-cms.ge/${item?.mainimage1}`}
													alt={index}
												/>
											</div>
											<div className="searchtitle">
												<a href={`product-detail/${item?.id}`}>{item?.title}</a>
											</div>
										</div>
									</li>
								))}
								<li className="searchtitle text-center p-2">
									<a onClick={handleClick}>ყველას ნახვა</a>
								</li>
							</ul>
						) : (
							nodata && (
								<ul className="searchdrop dropdown-menu show mt-1">
									<li className="searchtitle text-center p-2">
										პროდუქტი ვერ მოიძებნა
									</li>
								</ul>
							)
						)}
					</div>

					{/* Icons (Account, Wishlist, Cart) - Hidden on mobile */}
					<div className="col-sm-2 d-none d-sm-flex justify-content-end">
						<ul className="nav-icon d-flex align-items-center gap-20">
							<li className="nav-account">
								{typeof token === "undefined" ? (
									<a
										href="#login"
										data-bs-toggle="modal"
										className="nav-icon-item"
									>
										<i
											className="icon icon-account"
											style={{ color: "white" }}
										/>
									</a>
								) : (
									<div className="top-bar-language tf-cur justify-content-end">
										<div className="tf-currencies">
											<Profile topStart />
										</div>
									</div>
								)}
							</li>

							<li className="nav-wishlist">
								<Link href={`/wishlist`} className="nav-icon-item">
									<i
										className="fa-regular fa-heart fa-xl"
										style={{ color: "white" }}
									></i>
									<span className="count-box" style={{ marginTop: "-11px" }}>
										<WishlistLength />
									</span>
								</Link>
							</li>
							<li className="nav-cart">
								<a href={`/view-cart`} className="nav-icon-item">
									<img
										src="/images/shop/products/cart.svg"
										style={{ width: "22px", marginTop: "3px" }}
									/>

									<CartLength />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
}
