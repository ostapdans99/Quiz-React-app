import React from "react"
import classes from "./ActiveQuiz.module.css"
import { AnswersList } from "../index"

export default function ActiveQuiz(props) {
	return (
		<div className={classes.ActiveQuiz}>
			<p className={classes.Question}>
				<span>
					<strong>{props.answerNumber}</strong>&nbsp; {props.question}
				</span>
				<small>
					{props.answerNumber} из {props.quizLength}
				</small>
			</p>

			<AnswersList
            state ={props.state}
				answers={props.answers}
				onAnswerClick={props.onAnswerClick}
			/>
		</div>
	)
}
