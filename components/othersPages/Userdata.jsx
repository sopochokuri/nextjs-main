"use client";
import { useContextElement } from "@/context/Context";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UserProfile from "./UserProfile";

export default function Userdata() {
	const { token } = useContextElement();
	const { cartProducts, setCartProducts, totalPrice } = useContextElement();

	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [personal_id, setpersonal_id] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [wantsCard, setWantsCard] = useState("0");

	useEffect(() => {
		if (!token) return;

		const fetchUserData = async () => {
			try {
				const res = await fetch(
					`https://digital-cms.ge/!api/auth/check?token=${token}`
				);
				if (!res.ok) throw new Error("Failed to fetch user data");

				const data = await res.json();
				const user = data.user;
				console.log("User Info:", user);

				if (user?.phone) setPhone(user.phone);
				if (user?.email) setEmail(user.email);
				if (user?.birthdate) setBirthDate(user.birthdate);
				if (user?.personal_id && user.personal_id !== "0")
					setpersonal_id(user.personal_id);
				if (user?.address) setAddress(user.address);
				if (user?.city) setCity(user.city);
				if (user?.wantscard !== undefined)
					setWantsCard(user.wantscard.toString());
			} catch (err) {
				console.error("Error fetching user data:", err);
			}
		};

		fetchUserData();
	}, [token]);

	return (
		<section className="flat-spacing-11">
			<div className="container">
				<div className="tf-page-cart-wrap layout-2">
					<div className="tf-page-cart-item">
						<form
							onSubmit={(e) => e.preventDefault()}
							className="form-checkout"
						>
							<UserProfile
								email={email}
								phone={phone}
								city={city}
								address={address}
								birthDate={birthDate}
								personal_id={personal_id}
								wantsCard={wantsCard}
								buttonname="დამახსოვრება"
							/>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
