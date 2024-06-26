import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./css/signUp.css";
import { isAuthenticated } from "./auth";
import { PiStudentLight } from "react-icons/pi";
import { GiBookmarklet } from "react-icons/gi";
import logo from "./assets/logo.svg";
import logoText from "./assets/logotextL.png";
import image from "./assets/logInImage.png";

function Switch({ checked, change }) {
	return (
		<>
			<div className="switchContainerWrapper">
				<div
					className={`switchContainer ${checked ? "checked" : ""}`}
					onClick={change}
				>
					<div className="switch">
						<div className={`slider ${checked ? "checked" : ""}`}>
							{checked ? (
								<GiBookmarklet size={20} />
							) : (
								<PiStudentLight size={20} />
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default function SignUp() {
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		password: "",
		cpassword: "",
		isTutor: false,
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated()) {
			navigate("/dashboard");
		}
	}, []);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleCheck = (e) => {
		setFormData({ ...formData, isTutor: !formData.isTutor });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.cpassword) {
			console.error("Passwords do not match");
			return;
		}

		try {
			const response = await fetch(
				"http://localhost:5000/api/users/signUp",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				console.log("User created successfully");
				const data = await response.json();
				localStorage.setItem("token", data.token);
				toast.success("Account created successfully");
				navigate("/dashboard");
			} else {
				const data = await response.json();
				console.error("Error creating user:", data.error);
				toast.error(`${data.error}`);
			}
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	return (
		<div className="container__su text">
			<div className="banner__su">
				<div className="bannerImg__su">
					<img src={image}/>
				</div>
				<div className="bannerText__su">
					<div className="bannerTitle__su">Welcome to SkillBuddy</div>
					<div className="bannerContent__su">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam.
					</div>
				</div>
			</div>
			<div className="signUpBox">
				<div className="logo__su">
					<img src={logoText} alt="logo"></img>
					<div className="home__su">
						<a href="/">Back To Home</a>
					</div>
				</div>
				<h1>Create your account</h1>
				<form id="signUpForm" onSubmit={handleSubmit}>
					<div className="formGroup__su tutorCheck">
						<Switch
							change={handleCheck}
							checked={formData.isTutor}
						/>
					</div>
					
						<div className="formGroup__su">
							<label className="formLabel__su">First Name</label>
							<input
								type="text"
								name="firstname"
								className="formInput__su text"
								value={formData.firstname}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="formGroup__su">
							<label className="formLabel__su">Last Name</label>
							<input
								type="text"
								name="lastname"
								className="formInput__su text"
								value={formData.lastname}
								onChange={handleChange}
								required
							/>
						</div>
					<div className="formGroup__su">
						<label className="formLabel__su">Username</label>
						<input
							type="text"
							name="username"
							className="formInput__su text"
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="formGroup__su">
						<label className="formLabel__su">Email Address</label>
						<input
							type="text"
							name="email"
							className="formInput__su text"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="formGroup__su">
						<label className="formLabel__su">Password</label>
						<input
							type="password"
							name="password"
							className="formInput__su text"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="formGroup__su">
						<label className="formLabel__su">
							Password Confirmation
						</label>
						<input
							type="password"
							name="cpassword"
							className="formInput__su text"
							value={formData.cpassword}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="submit__su">
						<button type="submit" className="submitButton__su text">
							Create Account
						</button>
					</div>
				</form>
				<div className="formBottom__su">
					Already have an account ? <a href="/signin">Login</a>
				</div>
			</div>
		</div>
	);
}
