"use client";
import { allProducts } from "@/data/products";
import { Oneproduct } from "@/services/Api";
import { openCartModal } from "@/utlis/openCartModal";
// import { openCart } from "@/utlis/toggleCart";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
const dataContext = React.createContext();
export const useContextElement = () => {
	return useContext(dataContext);
};

export default function Context({ children }) {
	const [cartProducts, setCartProducts] = useState([]);
	const [wishList, setWishList] = useState([1, 2, 3]);
	const [compareItem, setCompareItem] = useState([1, 2, 3]);
	const [loadAddCart, setLoadaddCart] = useState(false);
	const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
	const [quickAddItem, setQuickAddItem] = useState(1);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalcartQ, setTotalcartQ] = useState(0);
	const [token, setToken] = useState("");

	useEffect(() => {
		const token = Cookies.get("auth_token");
		setToken(token);
		console.log("Token from cookie:", token);

		const subtotal = cartProducts.reduce((accumulator, product) => {
			let myprice = product.saleprice == 0 ? product.price : product.saleprice;
			return accumulator + product.quantity * myprice;
		}, 0);
		setTotalPrice(subtotal);

		const totalcartquantity = cartProducts.reduce(
			(sum, item) => sum + item.quantity,
			0
		);
		setTotalcartQ(totalcartquantity);
	}, [cartProducts]);

	// const addProductToCart = (id, qty) => {
	// 	if (!cartProducts.filter((elm) => elm.id == id)[0]) {
	// 		const item = {
	// 			...allProducts.filter((elm) => elm.id == id)[0],
	// 			quantity: qty ? qty : 1,
	// 		};
	// 		setCartProducts((pre) => [...pre, item]);
	// 		//openCartModal();

	// 		// openCart();
	// 	}
	// };
	const addProductToCart = (id, qty = 1) => {
		setLoadaddCart(true);
		Oneproduct(id)
			.then((res) => {
				if (!res) {
					console.error("Product not found");
					setLoadaddCart(false);
					return;
				}
				// Set product image if images exist
				const image =
					Array.isArray(res?.images) && res.images.length > 0
						? `https://digital-cms.ge/${res.images[0].file_name}`
						: "";
				// Check if the product is already in the cart
				setCartProducts((prevCart) => {
					const existingItem = prevCart.find((item) => item.id === id);
					if (existingItem) {
						// Update quantity if the product exists
						return prevCart.map((item) =>
							item.id === id ? { ...item, quantity: item.quantity + qty } : item
						);
					} else {
						// Add new product if not in cart
						return [
							...prevCart,
							{
								id: res.id,
								title_web: res.title_web,
								image,
								price: res.price,
								saleprice: res.saleprice,
								quantity: qty,
							},
						];
					}
				});

				setLoadaddCart(false);
			})
			.catch((error) => {
				console.error("Error fetching product:", error);
				setLoadaddCart(false);
			});
	};

	const removeFromCart = (id) => {
		setCartProducts((prevCart) => {
			return prevCart
				.map((item) =>
					item.id === id
						? { ...item, quantity: item.quantity - 1 } // Decrease quantity
						: item
				)
				.filter((item) => item.quantity > 0); // Remove item if quantity is 0
		});
	};

	//};
	const isAddedToCartProducts = (id) => {
		if (cartProducts.filter((elm) => elm.id == id)[0]) {
			return true;
		}
		return false;
	};

	const AddedCartProductQuantity = (id) => {
		const product = cartProducts.find((elm) => elm.id == id);
		if (product) {
			return product?.quantity;
		}
		return 0;
	};

	const addToWishlist = (id) => {
		if (!wishList.includes(id)) {
			setWishList((pre) => [...pre, id]);
		} else {
			setWishList((pre) => [...pre].filter((elm) => elm != id));
		}
	};
	const removeFromWishlist = (id) => {
		if (wishList.includes(id)) {
			setWishList((pre) => [...pre.filter((elm) => elm != id)]);
		}
	};
	const addToCompareItem = (id) => {
		if (!compareItem.includes(id)) {
			setCompareItem((pre) => [...pre, id]);
		}
	};
	const removeFromCompareItem = (id) => {
		if (compareItem.includes(id)) {
			setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
		}
	};
	const isAddedtoWishlist = (id) => {
		if (wishList.includes(id)) {
			return true;
		}
		return false;
	};
	const isAddedtoCompareItem = (id) => {
		if (compareItem.includes(id)) {
			return true;
		}
		return false;
	};
	useEffect(() => {
		console.log("cartlist", localStorage.getItem("cartList"));
		const items = JSON.parse(localStorage.getItem("cartList"));
		if (items?.length) {
			setCartProducts(items);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("cartList", JSON.stringify(cartProducts));
	}, [cartProducts]);

	useEffect(() => {
		const items = JSON.parse(localStorage.getItem("wishlist"));
		if (items?.length) {
			setWishList(items);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("wishlist", JSON.stringify(wishList));
	}, [wishList]);

	const contextElement = {
		cartProducts,
		setCartProducts,
		totalPrice,
		addProductToCart,
		isAddedToCartProducts,
		AddedCartProductQuantity,
		removeFromWishlist,
		addToWishlist,
		isAddedtoWishlist,
		quickViewItem,
		wishList,
		setQuickViewItem,
		quickAddItem,
		setQuickAddItem,
		addToCompareItem,
		isAddedtoCompareItem,
		removeFromCompareItem,
		compareItem,
		setCompareItem,
		loadAddCart,
		removeFromCart,
		totalcartQ,
		token,
	};
	return (
		<dataContext.Provider value={contextElement}>
			{children}
		</dataContext.Provider>
	);
}
