import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

// import { getDatabase,ref, set } from "firebase/database";
import { getDatabase, ref, push, onValue, set, remove } from "@firebase/database";

export const popup = (value) => {
	return {
		type: "CHANGE_POPUP",
		payload: value,
	};
};
export const isLogin = (value) => {
	return {
		type: "CHANGE_LOGIN",
		payload: value,
	};
};
export const user = (name) => {
	return (dispatch) => {
		dispatch({
			type: "CHANGE_USER",
			payload: name,
		});
	};
};

export const registerUserAPI = (data, loading) => (dispatch) => {
	const auth = getAuth();
	dispatch({
		type: "CHANGE_LOADING",
		payload: loading,
	});

	return new Promise((resolve, reject) => {
		// console.log("email, password send", email, password);
		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log("success", user);
				dispatch({
					type: "CHANGE_LOADING",
					payload: false,
					data,
				});
				resolve(true);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				dispatch({
					type: "CHANGE_LOADING",
					payload: false,
					data,
				});
				reject(false);
			});
	});
};

export const loginUserAPI = (data, loading) => (dispatch) => {
	const auth = getAuth();
	dispatch({
		type: "CHANGE_LOADING",
		payload: loading,
	});
	return new Promise((resolve, reject) => {
		// console.log("email, password send", email, password);
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				const dataUser = {
					email: user.email,
					uid: user.uid,
					emailVerified: user.emailVerified,
					refreshToken: user.refreshToken,
				};
				console.log("success", user);
				dispatch({
					type: "CHANGE_LOADING",
					payload: false,
				});
				dispatch({
					type: "CHANGE_LOGIN",
					payload: true,
				});
				dispatch({
					type: "CHANGE_USER",
					payload: dataUser,
				});
				resolve(dataUser);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				dispatch({
					type: "CHANGE_LOADING",
					payload: false,
				});
				dispatch({
					type: "CHANGE_LOGIN",
					payload: false,
				});
				reject(false);
			});
	});
};

// export const addDataToAPI = (data) => (dispatch) => {
// 	database.ref('notes/'+ data.userId).set({
// 		title: data.title,
// 		content: data.content,
// 		date: data.date
// 		})
// }

// export function addDataToAPI(data) {

//   const db = getDatabase();
//   set(ref(db, 'notes/' + data.userId), {
// 		title: data.title,
// 		content: data.content,
// 		date: data.date
//   });
// }

export const addDataToAPI = (data) => (dispatch) => {
	// dispatch({
	// 	type:'CHANGE_USER',
	// 	data
	// })
	console.log("success kirim data", data);
	const db = getDatabase();
	push(ref(db, "notes/" + data.userId), {
		title: data.title,
		content: data.content,
		date: data.date,
	});
};

export const getDataToAPI = (userId) => (dispatch) => {
	const db = getDatabase();
	const starCountRef = ref(db, "notes/" + userId);
	return new Promise((resolve, reject) => {
		onValue(starCountRef, (snapshot) => {
			const dataSnap = [];
			Object.keys(snapshot.val()).map((key) => {
				dataSnap.push({
					id: key,
					data: snapshot.val()[key],
				});
			});
			// updateStarCount(postElement, data);
			console.log("get data", dataSnap);
			dispatch({
				type: "SET_NOTES",
				payload: dataSnap,
			});
			resolve(snapshot.val());
		});
	});
};

// export const updateDataToAPI = (data) => (dispatch) => {
// 	const db = getDatabase();
// 	const starCountRef = ref(db,`notes/${data.userId}/${data.noteId}`);
// 	return new Promise((resolve, reject) => {
// 		onValue(starCountRef, (snapshot) => {
// 			const dataSnap = [];
// 			Object.keys(snapshot.val()).map((key) => {
// 				dataSnap.set(data.body, (err) => {
// 					if(err){
// 						reject(false)
// 					}else{
// 						resolve(true);
// 					}
// 				})
// 			});
// 			// updateStarCount(postElement, data);
// 			console.log("get data", dataSnap);
// 			dispatch({
// 				type: "SET_NOTES",
// 				payload: dataSnap,
// 			});
// 		});
// 	});
// };

export const updateDataToAPI = (data) => (dispatch) => {
	const db = getDatabase();
	return new Promise((resolve, reject) => {
		set(ref(db,`notes/${data.userId}/${data.noteId}`),{
			title: data.title,
			content: data.content,
			date: data.date,
		})
		.then(() => {
			resolve(true)
		})
		.catch((err) => {
			reject(false)
		});
	})
}


export const deleteDataToAPI = (data) => (dispatch) => {
	const db = getDatabase();
	return new Promise((resolve, reject) => {
		remove(ref(db,`notes/${data.userId}/${data.noteId}`))
	})
}