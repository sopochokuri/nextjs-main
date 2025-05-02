"use client";
import Products from "@/components/shopDetails/Products";
import ShopSimilarProducts from "@/components/shopDetails/ShopSimilarProducts";
import React from "react";
import Link from "next/link";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import { allProducts } from "@/data/products";
import ProductSinglePrevNext from "@/components/common/ProductSinglePrevNext";
import { useState, useEffect } from "react";
import { Oneproduct } from "@/services/Api";
import { Similarproducts } from "@/services/Api";
export default function page({ params }) {
  // const product =
  // 	allProducts.filter((elm) => elm.id == params.id)[0] || allProducts[0];
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const [similarproduct, setSimilarProduct] = useState([]);
  useEffect(() => {
    fetchSimilarProducts();
  }, []);

  const fetchData = async () => {
    try {
      const singleproduct = await Oneproduct(params?.id);
      setProduct(singleproduct);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
    }
  };
  const fetchSimilarProducts = async () => {
    try {
      const similarproducts = await Similarproducts(params.id);
      setSimilarProduct(similarproducts);
    } catch (error) {
      console.error("Failed to fetch Similar products:", error);
    } finally {
    }
  };
  return (
    <>
      <div className="tf-breadcrumb paddingtopdiv">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                მთავარი
              </Link>
              <i className="icon icon-arrow-right" />
              <span className="text">
                {product?.title_web ? product?.title_web : ""}
              </span>
            </div>
            {/* <ProductSinglePrevNext currentId={product.id} /> */}
          </div>
        </div>
      </div>
      <DetailsOuterZoom product={product} />
      {/* <ShopDetailsTab product={product} /> */}
      <ShopSimilarProducts similarproduct={similarproduct} />
      {/* <Products />
			<RecentProducts /> */}
    </>
  );
}
