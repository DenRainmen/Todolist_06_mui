import { useState } from "react";

import styles from './App.module.css'


type PropsType = {
	callback: (title: string)=>void
}




export const AddItemForm = (props: PropsType) => {

let[title, setTitle] = useState('')
let[error, setError] = useState('')


const addTitle=()=>{
	if(title.trim() === ''){
			setError("Title is required")
			setTitle('')
		}else{
			props.callback(title.trim())
			setTitle('')
		}
}


	function onChangeHandler(value: string): void {
		setTitle(value)
		setError("")
	}

	function onKeyDownHandler(key: string): void {
		if(key === "Enter"){addTitle()}
	}

	return (
		<div>
		<input
			placeholder={'Tape something here ...'}
			value={title}
			onChange={(e)=>onChangeHandler(e.currentTarget.value)}
			onKeyDown={(e)=>onKeyDownHandler(e.key)}
		/>
		<button className={styles.addTitle}>+</button>
		
		{error?<div className={styles.error }>{error}</div>: <div></div>}
	</div>
	);
};

