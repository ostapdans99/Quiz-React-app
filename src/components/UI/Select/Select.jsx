import React from "react"
import classes from "./Select.module.css"

export default function Select(props) {
	const htmlFor = `${props.label}-${Math.random()}`

	return (
		<div className={classes.Select}>
			<label htmlFor={htmlFor}></label>
			<select id={htmlFor} value={props.vale} onChange={props.onChange}>
				{props.options.map((option, index) => {
					return (
						<option value={option.value} key={option.value + index}>
							{option.text}
						</option>
					)
				})}
			</select>
		</div>
	)
}
