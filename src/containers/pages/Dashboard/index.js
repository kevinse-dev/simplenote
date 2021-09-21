// import { set } from 'firebase/database';
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addDataToAPI,
	deleteDataToAPI,
	getDataToAPI,
	updateDataToAPI,
} from "../../../config/Redux/actions/action";
import "./Dashboard.scss";

export default function Dashboard() {
	const [title, setTitle] = useState();
	const [content, setContent] = useState();
	const [date, setDate] = useState();
	const [btn, setButton] = useState("simpan");
	const [noteId, setNoteId] = useState()

	const notes = useSelector((state) => state.popup.notes);
	const dispatch = useDispatch();


	const saveNotes = (data) => {
		dispatch(addDataToAPI(data));
	};

	const updateNote = (data) => {
		dispatch(updateDataToAPI(data))
	}

	const deleteNote = (data) => {
		dispatch(deleteDataToAPI(data))
	}

	const updateNotes = (item) => {
		console.log(item);
		setContent(item.data.content);
		setTitle(item.data.title);
		setButton("update");
		setNoteId(item.id)
	};

	const handleCancel = () => {
		setContent("");
		setTitle("");
		setButton("simpan");
	};

	useEffect(() => {
		const getData = (data) => {
			dispatch(getDataToAPI(data));
		};
		const local = localStorage.getItem("wajib");
		const userData = JSON.parse(localStorage.getItem("wajib"));
		console.log("dashboard", JSON.parse(local));

		getData(userData.uid);
		console.log("notes", notes);
	}, [dispatch, notes.length]);

	const handleSaveNotes = () => {
		// const {saveNotes} = this.props
		const userId = JSON.parse(localStorage.getItem("wajib"));
		const data = {
			title: title,
			content: content,
			date: new Date().getTime(),
			// userId: user.user.uid
			userId: userId.uid,

		};
		if(btn === 'simpan'){
			saveNotes(data);
		}else{
			data.noteId = noteId
			updateNote(data)
		}
		// console.log('data', data);
	};

	const inputChange = (e, type) => {
		if (type === "title") {
			setTitle(e.target.value);
		}
		if (type === "content") {
			setContent(e.target.value);
		}
	};

	const handleDelete = (e, item) => {
		e.stopPropagation()
		const userId = JSON.parse(localStorage.getItem("wajib"));
		const data = {
			userId: userId.uid,
			noteId: item.id
		}
		deleteNote(data)
	}

	return (
		<div className="container">
			<div className="input-form">
				<input
					onChange={(e) => inputChange(e, "title")}
					value={title}
					className="input-title"
					type="text"
					placeholder="title"
				/>
				<textarea
					value={content}
					className="input-content"
					name="comment"
					id=""
					cols="30"
					rows="3"
					placeholder="content"
					onChange={(e) => inputChange(e, "content")}
				></textarea>

				<div className="action-wrapper">
					{btn === "update" ? (
						<button onClick={handleCancel} className="save-btn cancel">
							cancel
						</button>
					) : <div></div>}
					<button onClick={handleSaveNotes} className="save-btn">
						{btn}
					</button>
				</div>
			</div>
			<hr />

			{notes.length > 0 ? (
				<Fragment>
					{notes.map((item) => {
						return (

							<div
								className="card-content"
								key={item.id}
								onClick={() => updateNotes(item)}
							>
								<p className="title">{item.data.title}</p>
								<p className="date">{item.data.date}</p>
								<p className="content">{item.data.content}</p>
								<div onClick={(e) => handleDelete(e, item)} className='delete-btn'>x</div>
							</div>
						);
					})}
				</Fragment>
			) : null}

			{/* <button>Go to Register</button>
            <button>Go to Dashboard</button> */}
		</div>
	);
}
