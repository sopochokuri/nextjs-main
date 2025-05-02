import Features from "@/components/common/Features";
import ShopGram from "@/components/common/ShopGram";
import Testimonials from "@/components/common/Testimonials";

import Topbar1 from "@/components/headers/Topbar1";
import Brands from "@/components/homes/home-1/Brands";
import Categories from "@/components/homes/home-1/Categories";
import Hero from "@/components/homes/home-1/Hero";
import Lookbook from "@/components/homes/home-1/Lookbook";
import Marquee from "@/components/homes/home-1/Marquee";
import Products from "@/components/homes/home-1/Products";

export const metadata = {
	// title: "Canshop",
	description: "",
	// icons: {
	// 	icon: "/images/logo/logo01.ico", // For most browsers
	// },
};

export default function Home() {
	return (
		<>
			{/* <Topbar1 /> */}
			<Hero />
			<Marquee />
			<Categories />
			<Products />
			<Lookbook />
			<Testimonials />
			<Brands />
			<ShopGram />
			<Features />
		</>
	);
}
