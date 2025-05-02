"use client";
import { layouts } from "@/data/shop";
import ProductGrid from "./ProductGrid";
import EmptyProductGrid from "./EmptyProductGrid";
import { useState, useEffect, useReducer, useCallback } from "react";
import HomeListReducer from "@/store/HomeListReducer";
import ShopFilter from "./ShopFilter";
import { ClipLoader, DotLoader } from "react-spinners";
export default function ShopFullwidth({ fetchProducts }) {
	const [page, setPage] = useState(1);
	const [gridItems, setGridItems] = useState(6);
	const [products, setProducts] = useState([]);
	const [finalSorted, setFinalSorted] = useState([]);

	const initialState = {
		loading: false,
		loadmore: false,
		data: [],
		productslength: 0,
	};
	const [state, dispatch] = useReducer(HomeListReducer, initialState);

	const fetchData = useCallback(
		async (page) => {
			try {
				dispatch({ type: "LOADING_START" }); // ✅ Use dispatch
				const products = await fetchProducts(page);
				dispatch({ type: "SETDATA", payload: products, page });
			} catch (error) {
				console.error("Failed to fetch products:", error);
			} finally {
				dispatch({ type: "LOADING_END" }); // ✅ Use dispatch
			}
		},
		[fetchProducts]
	);

	useEffect(() => {
		fetchData(page);
	}, [page, fetchData]);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const windowHeight = window.innerHeight;
			const fullHeight = document.documentElement.scrollHeight;

			if (scrollTop + windowHeight >= fullHeight - 200) {
				if (!state.loading && !state.loadmore) {
					dispatch({ type: "LOAD_MORE_START" });
					setPage((prevPage) => prevPage + 1);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [state.loading, state.loadmore]); // ✅ Listen to both loading and loadmore

	return (
		<>
			<section className="flat-spacing-1 margindiv">
				<div className="container-full">
					<div className="tf-shop-control align-items-center">
						<ul className="tf-control-layout d-flex justify-content-center">
							{layouts.map((layout, index) => (
								<li
									key={index}
									className={`tf-view-layout-switch ${layout.className} ${
										gridItems === layout.dataValueGrid ? "active" : ""
									}`}
									onClick={() => setGridItems(layout.dataValueGrid)}
								>
									<div className="item">
										<span className={`icon ${layout.iconClass}`} />
									</div>
								</li>
							))}
						</ul>
					</div>

					<div className="wrapper-control-shop">
						<div className="meta-filter-shop" />
						{state.loading && page === 1 ? (
							<EmptyProductGrid gridItems={gridItems} />
						) : (
							<ProductGrid gridItems={gridItems} data={state.data} />
						)}
						{
							state.productslenght < 24 ? (
								""
							) : (
								<ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn">
									{/* <Pagination data={data} /> */}
									{
										state.loadmore && <ClipLoader color="#bf00ff" size={40} />
										//: (
										// 	// <Loadmore onLoadMore={onLoad} />
										// 	 loading && <div className="text-center p-4">Loading...</div>
										// )
									}
								</ul>
							)

							// : (
							// 	<ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn mainfont">
							// 		<p style={{ color: "#bf00ff" }}>მეტი პროდუქტი არ არის</p>
							// 	</ul>
							// )
						}
					</div>
				</div>
			</section>
			<ShopFilter setProducts={setProducts} />
		</>
	);
}
