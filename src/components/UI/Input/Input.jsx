import React from "react"
import classes from "./Input.module.css"

const isInvalid = ({ valid, touched, shouldValidate }) => {
	return !valid && shouldValidate && touched
}

export default function Input(props) {
	const inputType = props.type || "text"
	const cls = [classes.Input, isInvalid(props) ? classes.invalid : ""]
	const htmlFor = `${inputType} - ${Math.random()}`


	return (
		<div className={cls.join(" ")}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input
				type={inputType}
				id={htmlFor}
				value={props.value}
				onChange={props.onChange}
			></input>

			{isInvalid(props) ? (
				<span>{props.errorMessage || "Введите верное значение"}</span>
			) : null}
		</div>
	)
}
