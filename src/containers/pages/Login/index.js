import { useSelector, useDispatch } from "react-redux";
import { loginUserAPI, user } from "../../../config/Redux/actions/action";
import Button from "../../../components/atoms/Button/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const popup = useSelector((state) => state.popup);
	const dispatch = useDispatch();
	const history = useHistory()
	// const handleName = () => {
	// 	setTimeout(() => {
	// 		dispatch(user("kevin"));
	// 	}, 5000);
	// };

	const handleChangeText = (e) => {
		// console.log(e.target.id);
		if (e.target.id === "email") {
			setEmail(e.target.value);
		}
		if (e.target.id === "password") {
			setPassword(e.target.value);
		}
	};
	const handleLoginSubmit = async () => {
		console.log("email", email);
		console.log("password :", password);
		//!simulasi dari button
		//   setIsloading(true)
		// setTimeout(() => {
		//   setIsloading(false)
		// }, 5000);
		const res = await dispatch(loginUserAPI({ email, password }, true)).catch(Error => Error)
			if(res){
				// console.log('success', res);
				// localStorage.setItem('res', res) //[object][object]
				localStorage.setItem('wajib', JSON.stringify(res))
				setEmail("");
				setPassword("");
				history.push('/')
			}else{
				console.log('login filed');
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
					onclick={handleLoginSubmit}
					title="Login"
					loading={popup.isLoading}
				/>
			</div>
		</div>
	);
}
