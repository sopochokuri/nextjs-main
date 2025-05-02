"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import emailjs from "@emailjs/browser";
import { Social } from "@/services/Api";
import { aboutLinks, footerLinks, helpFooter } from "@/data/footerLinks";
export default function Footer1({ bgColor = "" }) {
	useEffect(() => {
		const headings = document.querySelectorAll(".footer-heading-moblie");
		fetchsocial();
		const toggleOpen = (event) => {
			const parent = event.target.closest(".footer-col-block");

			parent.classList.toggle("open");
		};

		headings.forEach((heading) => {
			heading.addEventListener("click", toggleOpen);
		});

		// Clean up event listeners when the component unmounts
		return () => {
			headings.forEach((heading) => {
				heading.removeEventListener("click", toggleOpen);
			});
		};
	}, []); // Empty dependency array means this will run only once on mount

	const formRef = useRef();
	const [success, setSuccess] = useState(true);
	const [showMessage, setShowMessage] = useState(false);
	const [socialData, setSocialData] = useState([]);

	const fetchsocial = async () => {
		const socialparameters = await Social();
		setSocialData(socialparameters);
	};
	const handleShowMessage = () => {
		setShowMessage(true);
		setTimeout(() => {
			setShowMessage(false);
		}, 2000);
	};

	const sendMail = (e) => {
		emailjs
			.sendForm("service_noj8796", "template_fs3xchn", formRef.current, {
				publicKey: "iG4SCmR-YtJagQ4gV",
			})
			.then((res) => {
				if (res.status === 200) {
					setSuccess(true);
					handleShowMessage();
					formRef.current.reset();
				} else {
					setSuccess(false);
					handleShowMessage();
				}
			});
	};

	return (
		<footer id="footer" className={`footer md-pb-70 ${bgColor}`}>
			<div className="footer-wrap">
				<div className="footer-body">
					<div className="container">
						<div className="row">
							<div className="col-xl-3 col-md-6 col-12">
								<div className="footer-infor">
									<div className="footer-logo">
										<Link href={`/`}>
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
									<ul className="tf-social-icon d-flex gap-10">
										<li>
											<a
												href={socialData?.facebook}
												target="_blank"
												className="box-icon w_34 round social-facebook social-line"
											>
												<i className="icon fs-14 icon-fb" />
											</a>
										</li>
										<li>
											<a
												href={socialData?.twitter}
												target="_blank"
												className="box-icon w_34 round social-twiter social-line"
											>
												<i className="icon fs-12 icon-Icon-x" />
											</a>
										</li>
										<li>
											<a
												href={socialData?.instagram}
												target="_blank"
												className="box-icon w_34 round social-instagram social-line"
											>
												<i className="icon fs-14 icon-instagram" />
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-xl-3 col-md-6 col-12 footer-col-block">
								<div className="footer-heading footer-heading-desktop">
									<h6>მაღაზია</h6>
								</div>
								<div className="footer-heading footer-heading-moblie">
									<h6>Help</h6>
								</div>
								<ul className="footer-menu-list tf-collapse-content">
									{footerLinks.map((link, index) => (
										<li key={index}>
											<Link href={link.href} className="footer-menu_item">
												{link.text}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="col-xl-3 col-md-6 col-12 footer-col-block">
								<div className="footer-heading footer-heading-desktop">
									<h6>დახმარება</h6>
								</div>
								<div className="footer-heading footer-heading-moblie">
									<h6>დახმარება</h6>
								</div>
								<ul className="footer-menu-list tf-collapse-content">
									{helpFooter.slice(0, 4).map((link, index) => (
										<li key={index}>
											<Link href={link.href} className="footer-menu_item">
												{link.text}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="col-xl-3 col-md-6 col-12">
								<div className="footer-newsletter footer-col-block">
									<div className="footer-heading footer-heading-desktop">
										<h6>კომპანია</h6>
									</div>
									<div className="footer-heading footer-heading-moblie">
										<h6>კომპანია</h6>
									</div>
									<ul className="footer-menu-list tf-collapse-content">
										{aboutLinks.slice(0, 4).map((link, index) => (
											<li key={index}>
												<Link href={link.href} className="footer-menu_item">
													{link.text}
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="footer-bottom">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="footer-bottom-wrap d-flex gap-20 flex-wrap justify-content-between align-items-center">
									<div className="footer-menu_item">
										Copyright © 2025 Canshop . All Right Reserved
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
