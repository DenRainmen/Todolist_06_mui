import { useState } from "react";


type PropsType = {
	oldTitle: string
	callback: (text: string)=>void
}




 export const EditableSpan = (props: PropsType) => {

let[editMode, setEditMode] = useState(false)
let[title, setTitle] = useState(props.oldTitle)


const editModeHandler =()=>{
	setEditMode(!editMode)
}

const onBlurHandler =()=>{
	addTitle()
	setEditMode(!editMode)
}




const addTitle=()=>{
	if(title.trim() === ''){
			
			setTitle(props.oldTitle)
		}else{
			
			setTitle(title.trim())
			props.callback(title.trim())
		}
}


	function onChangeHandler(value: string): void {
		setTitle(value)
		
	}

	function onKeyDownHandler(key: string): void {
		if(key === "Enter"){
			onBlurHandler()
		}
	}


	return (
		
		editMode?
		 <input type="text"
		 autoFocus
		 value={title}
		 onBlur={onBlurHandler}
		 onChange={(e)=>onChangeHandler(e.currentTarget.value)}
		onKeyDown={(e)=>onKeyDownHandler(e.key)}
		 />
		  :
		<span
		onDoubleClick={editModeHandler}
		>{props.oldTitle}</span>


	);
};

 