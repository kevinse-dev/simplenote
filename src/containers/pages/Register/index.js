import { useState } from "react";
import "./Register.scss";
import Button from "../../../components/atoms/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { registerUserAPI } from "../../../config/Redux/actions/action";

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const popup = useSelector((state) => state.popup);
	const dispatch = useDispatch();
	// const [isLoading, setIsloading] = useState(false)

	const handleChangeText = (e) => {
		// console.log(e.target.id);
		if (e.target.id === "email") {
			setEmail(e.target.value);
		}
		if (e.target.id === "password") {
			setPassword(e.target.value);
		}
	};
	const handleRegisterSubmit = async () => {
		console.log("email", email);
		console.log("password :", password);

		//!simulasi dari button
		//   setIsloading(true)
		// setTimeout(() => {
		//   setIsloading(false)
		// }, 5000);
		const res = await 	dispatch(registerUserAPI({ email, password }, true)).catch(err => err)
		if(res){
			setEmail('')
			setPassword('')
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-card">
				<p className="auth-title">Register page</p>
				<input
					className="input"
					id="email"
					type="text"
					placeholder="Email"
					onChange={handleChangeText}
					value={email}
				/>
				<input
					className="input"
					id="password"
					type="password"
					placeholder="Password"
					onChange={handleChangeText}
					value={password}
				/>
				<Button
					onclick={handleRegisterSubmit}
					title="Register"
					loading={popup.isLoading}
				/>
			</div>
			{/* <button>Go to Dashboard</button> */}
		</div>
	);
}
