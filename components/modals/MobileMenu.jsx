"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import { navItems } from "@/data/menu";
import { usePathname } from "next/navigation";
import RenderTree from "./RenderTree";
import { Menu } from "@/services/Api";
export default function MobileMenu() {
	const [menu, setMenu] = useState([]);
	useEffect(() => {
		// Function to fetch data from the URL

		const fetchData = async () => {
			try {
				const result = await Menu();
				setMenu(result); // Store data in state
			} catch (error) {
				console.error("Failed to fetch menu:", error);
			} finally {
			}
		};

		fetchData(); // Call the fetch function
	}, []);

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
		<div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
			<span
				className="icon-close icon-close-popup"
				data-bs-dismiss="offcanvas"
				aria-label="Close"
			/>
			<div className="mb-canvas-content">
				<div className="mb-body">
					<RenderTree data={menu} />
					{/* <ul className="nav-ul-mb" id="wrapper-menu-navigation">
						{menu.map((item, i) => (
							<li key={i} className="nav-mb-item">
								<a
									href={`#${item.id}`}
									className={`collapsed mb-menu-link current ${
										isMenuActive(item) ? "activeMenu" : ""
									}`}
									data-bs-toggle="collapse"
									aria-expanded="true"
									aria-controls={item.id}
								>
									 <span>{item.label}</span> 
									<span className="btn-open-sub" />
								</a>
								{/* <div id={item.id} className="collapse">
									<ul className="sub-nav-menu">
										{item.links.map((subItem, i2) => (
											<li key={i2}>
												{subItem.links ? (
													<>
														<a
															href={`#${subItem.id}`}
															className={`sub-nav-link collapsed  ${
																isMenuActive(subItem) ? "activeMenu" : ""
															}`}
															data-bs-toggle="collapse"
															aria-expanded="true"
															aria-controls={subItem.id}
														>
															<span>{subItem.label}</span>
															<span className="btn-open-sub" />
														</a>
														<div id={subItem.id} className="collapse">
															<ul className="sub-nav-menu sub-menu-level-2">
																{subItem.links.map((innerItem, i3) => (
																	<li key={i3}>
																		<Link
																			href={innerItem.href}
																			className={`sub-nav-link  ${
																				isMenuActive(innerItem)
																					? "activeMenu"
																					: ""
																			}`}
																		>
																			{innerItem.label}
																			{innerItem.demoLabel && (
																				<div className="demo-label">
																					<span className="demo-new">New</span>
																				</div>
																			)}
																		</Link>
																	</li>
																))}
															</ul>
														</div>
													</>
												) : (
													<Link
														href={subItem.href}
														className={`sub-nav-link ${
															isMenuActive(subItem) ? "activeMenu" : ""
														}`}
													>
														{subItem.label}
														{subItem.demoLabel && (
															<div className="demo-label">
																<span className="demo-new">New</span>
															</div>
														)}
													</Link>
												)}
											</li>
										))}
									</ul>
								</div> 
							</li>
						))}
						<li className="nav-mb-item">
							<a
								href="https://themeforest.net/item/ecomus-ultimate-html5-template/53417990?s_rank=3"
								className="mb-menu-link"
							>
								Buy now
							</a>
						</li>
					</ul> */}
				</div>
			</div>
		</div>
	);
}
