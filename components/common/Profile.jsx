"use client";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

export default function Profile({
	parentClassName = "image-select center style-default type-languages",
	topStart = false,
}) {
	const [selected, setSelected] = useState(1);
	const [isDDOpen, setIsDDOpen] = useState(false);
	const languageSelect = useRef();

	function logout() {
		Cookies.remove("auth_token");
		// Optional: redirect user or clear app state
		window.location.href = "/"; // or use a router navigate
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				languageSelect.current &&
				!languageSelect.current.contains(event.target)
			) {
				setIsDDOpen(false); // Close the dropdown if click is outside
			}
		};
		// Add the event listener when the component mounts
		document.addEventListener("click", handleClickOutside);

		// Cleanup the event listener when the component unmounts
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);
	return (
		<>
			<div
				className={`dropdown bootstrap-select ${parentClassName}  dropup `}
				onClick={() => setIsDDOpen((pre) => !pre)}
				ref={languageSelect}
			>
				{/* <select
					className="image-select center style-default type-languages"
					tabIndex="null"
				>
					{languageOptions.map((option, i) => (
						<option key={i} value={option.id}>
							{option.label}
						</option>
					))}
				</select> */}

				<i className="icon icon-account" style={{ color: "white" }} />
				{/* <button
					type="button"
					tabIndex={-1}
					className={`btn dropdown-toggle btn-light  ${
						isDDOpen ? "show" : ""
					} `}
				>
					<div className="filter-option">
						<div className="filter-option-inner">
							<div className="filter-option-inner-inner">{selected.label}</div>
						</div>
					</div>
				</button> */}
				<div
					className={`dropdown-menu ${isDDOpen ? "show" : ""} `}
					style={{
						maxHeight: "899.688px",
						width: "140px",
						overflow: "hidden",
						minHeight: 142,
						position: "absolute",
						inset: "auto auto 0px 5px",
						margin: 0,
						transform: `translate(-8px, ${topStart ? 22 : -1}px)`,
					}}
					data-popper-placement={`${!topStart ? "top" : "bottom"}-start`}
				>
					<div
						className="inner show"
						style={{
							maxHeight: "869.688px",
							overflowY: "auto",
							minHeight: 112,
						}}
					>
						<ul
							className="dropdown-menu inner show"
							role="presentation"
							style={{ marginTop: 0, marginBottom: 0 }}
						>
							<li
								key="1"
								onClick={() => setSelected(1)}
								className={`selected ${selected == 1 ? "active" : ""}`}
							>
								<a
									className={`dropdown-item ${
										selected == 1 ? "active selected" : ""
									}`}
									href={"/user"}
								>
									<span className="text">პროფილი</span>
								</a>
							</li>
							<li
								key="2"
								onClick={() => logout()}
								className={`selected ${selected == 2 ? "active" : ""}`}
							>
								<a
									className={`dropdown-item ${
										selected == 2 ? "active selected" : ""
									}`}
								>
									<span className="text">გასვლა</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
