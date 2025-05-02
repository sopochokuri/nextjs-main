"use client";
import React, { useState } from "react";
import { sendsms } from "@/services/Api";
import Cookies from "js-cookie";

export default function Login() {
	const [phone, setPhone] = useState("");
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	async function loginUser(e) {
		e.preventDefault(); // Prevent form from submitting

		if (phone == "") {
			setError("შეავსეთ ტელეფონის ნომერი");
			return;
		}
		if (code == "") {
			setError("შეავსეთ კოდი");
			return;
		}
		try {
			const res = await fetch(
				`https://digital-cms.ge/!api/auth/login?phone=${phone}&password=${code}`,
				{
					method: "GET",
				}
			);

			const data = await res.json();
			if (data.result === "success" && data.token) {
				Cookies.set("auth_token", data.token, { expires: 7 });
				window.location.href = "/";
			} else {
				setError(data.errortext || "დაფიქსირდა შეცდომა");
			}
		} catch (err) {
			console.error("Error during login:", err);
			setError("სერვერთან კავშირი ვერ მოხერხდა");
		}
	}

	const handlePhoneChange = (e) => {
		const value = e.target.value.replace(/\D/g, ""); // Only allow digits
		if (value.length <= 9) {
			setPhone(value);
		}
	};

	const requestCode = async () => {
		if (phone.length < 9) {
			setError("ტელეფონის ნომერი უნდა იყოს 9 სიმბოლო.");
			setSuccess(null);
			return;
		}

		setLoading(true);
		setError(null);
		setSuccess(null);

		const { success, message } = await sendsms(phone); // Call the imported function

		if (success) {
			setSuccess(message);
		} else {
			setError(message);
		}

		setLoading(false);
	};

	return (
		<div
			className="modal modalCentered fade form-sign-in modal-part-content"
			id="login"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="header">
						<div className="demo-title mainfont">პროფილი</div>
						<span
							className="icon-close icon-close-popup"
							data-bs-dismiss="modal"
						/>
					</div>
					<div className="tf-login-form">
						<form onSubmit={(e) => e.preventDefault()} acceptCharset="utf-8">
							{/* Phone Input */}
							<div className="tf-field style-1">
								<input
									className="tf-field-input tf-input"
									placeholder=" "
									type="tel"
									value={phone}
									onChange={handlePhoneChange}
									required
									autoComplete="off"
								/>
								<label className="tf-field-label mainfont">ტელეფონი *</label>
							</div>

							{/* Success & Error Messages (Immediately Below Input) */}
							{success && (
								<p
									style={{
										color: "green",
										textAlign: "center",
										marginTop: "5px",
									}}
								>
									{success}
								</p>
							)}
							{error && (
								<p
									style={{
										color: "red",
										textAlign: "center",
										marginTop: "5px",
									}}
								>
									{error}
								</p>
							)}

							{/* Request Code Button */}
							<div className="bottom">
								<button
									type="button"
									className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
									onClick={requestCode}
									disabled={loading}
								>
									<span className="mainfont">
										{loading ? "იგზავნება..." : "კოდის მოთხოვნა"}
									</span>
								</button>
							</div>

							{/* Code Input */}
							<div className="tf-field style-1">
								<input
									className="tf-field-input tf-input"
									placeholder=" "
									type="text"
									value={code}
									onChange={(e) => setCode(e.target.value)}
									required
									autoComplete="off"
								/>
								<label className="tf-field-label mainfont">კოდი *</label>
							</div>

							{/* Login Button */}
							<div className="bottom">
								<button
									type="submit"
									onClick={loginUser}
									className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
								>
									<span className="mainfont">შესვლა</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
