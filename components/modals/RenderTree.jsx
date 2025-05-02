"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const RenderTree = ({
	data,
	ulclassName = "nav-ul-mb boldfont",
	liclassName = "nav-mb-item",
}) => {
	// const getCatalogFromUrl = (url) => {
	// 	const parsedUrl = new URL(url);
	// 	return parsedUrl.searchParams.get("catalog");
	// };
	const pathname = usePathname();
	const isMenuActive = (menuItem) => {
		let active = false;
		if (menuItem.href?.includes("/")) {
			if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
				active = true;
			}
		}
		if (menuItem.links) {
			menuItem.links?.forEach((elm2) => {
				if (elm2.href?.includes("/")) {
					if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
						active = true;
					}
				}
				if (elm2.links) {
					elm2.links.forEach((elm3) => {
						if (elm3.href.split("/")[1] == pathname.split("/")[1]) {
							active = true;
						}
					});
				}
			});
		}

		return active;
	};
	return (
		<ul className={ulclassName} id="wrapper-menu-navigation">
			{Object.entries(data).map(([key, value]) => (
				<li key={value.id} className={liclassName}>
					{/* If the menu item has children */}
					{value.children && Object.keys(value.children).length > 0 ? (
						<>
							<Link
								href={`#${value.id}`}
								target="_blank"
								className="collapsed mb-menu-link current"
								data-bs-toggle="collapse"
								aria-expanded="true"
								aria-controls={value.id}
							>
								<span>{value.title}</span> <span className="btn-open-sub" />
							</Link>
							<div id={value.id} className="collapse">
								<RenderTree
									data={value.children}
									ulclassName="nav-ul-mb ulpadding"
									liclassName={`nav-mb-item collapsed ${
										isMenuActive(value) ? "activeMenu" : ""
									}`}
								/>
							</div>
						</>
					) : (
						/* If no children, render a Link for navigation */
						<Link
							/*href={`/product-catalog/${getCatalogFromUrl(value.productslink)}`}*/
							href={`/product-catalog/${value.catalog}`}
							className="mb-menu-link current"
						>
							{value.title}
						</Link>
					)}
				</li>
			))}
		</ul>
	);
};
export default RenderTree;
