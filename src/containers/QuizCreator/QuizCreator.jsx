import React, { Component } from "react"
import classes from "./QuizCreator.module.css"
import { Button, Input, Select } from "../../components/UI"
import { createControl, validate, validateForm } from "../../formFramework"

function createOptionControl(number) {
	return createControl(
		{
			label: `Вариант ${number}`,
			errorMessage: "Значение не может быть пустым",
			id: number,
		},
		{ required: true },
	)
}

function createFormControls() {
	return {
		question: createControl(
			{
				label: "Введите вопрос",
				errorMessage: "Вопрос не может быть пустым",
			},
			{ required: true },
		),
		option1: createOptionControl(1),
		option2: createOptionControl(2),
		option3: createOptionControl(3),
		option4: createOptionControl(4),
	}
}

export default class QuizCreator extends Component {
	state = {
		quiz: [],
		isFormValid: false,
		formControls: createFormControls(),
		rightAnswerId: 1,
	}

	submitHandler(event) {
		event.preventDefault()
	}

	addQuestionHandler = event => {
		event.preventDefault()

		const quiz = [...this.state.quiz]
		const index = quiz.length + 1

		const {
			question,
			option1,
			option2,
			option3,
			option4,
		} = this.state.formControls

		const questionItem = {
			question: question.value,
			id: index,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{ text: option1.value, id: option1.id },
				{ text: option2.value, id: option2.id },
				{ text: option3.value, id: option3.id },
				{ text: option4.value, id: option4.id },
			],
		}

		quiz.push(questionItem)

		this.setState({
			quiz,
			isFormValid: false,
			formControls: createFormControls(),
			rightAnswerId: 1,
		})
	}

	createQuizHandler = async event => {
		event.preventDefault()
		let postData = this.state.quiz
		try {
			const response = await fetch(
				"https://react-quiz-d51bc-default-rtdb.europe-west1.firebasedatabase.app/quizes.json",
				{ method: "POST", body: JSON.stringify(postData) },
			)
			await response.json()
			this.setState({
				quiz: [],
				isFormValid: false,
				formControls: createFormControls(),
				rightAnswerId: 1,
			})
		} catch (e) {
			console.log(e)
		}
	}

	changeHandler = (value, controlName) => {
		const formControls = { ...this.state.formControls }
		const control = { ...formControls[controlName] }

		control.touched = true
		control.value = value
		control.valid = validate(control.value, control.validation)

		formControls[controlName] = control

		this.setState({
			formControls,
			isFormValid: validateForm(formControls),
		})
	}

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName]

			return (
				<>
					<Input
						key={controlName + index}
						label={control.label}
						value={control.value}
						valid={control.valid}
						shouldValidate={!!control.validation}
						touched={control.touched}
						errorMessage={control.errorMessage}
						onChange={event =>
							this.changeHandler(event.target.value, controlName)
						}
					/>
					{index === 0 ? <hr /> : null}
				</>
			)
		})
	}

	selectChangeHandler = event => {
		this.setState({
			rightAnswerId: +event.target.value,
		})
	}

	render() {
		const select = (
			<Select
				label="Выберите правильный ответ"
				value={this.state.rightAnswerId}
				onChange={this.selectChangeHandler}
				options={[
					{ text: 1, value: 1 },
					{ text: 2, value: 2 },
					{ text: 3, value: 3 },
					{ text: 4, value: 4 },
				]}
			/>
		)

		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Создание теста</h1>

					<form onSubmit={this.submitHandler}>
						{this.renderInputs()}
						{select}
						<Button
							type="primary"
							onClick={this.addQuestionHandler}
							disabled={!this.state.isFormValid}
						>
							Добавить вопрос
						</Button>
						<Button
							type="success"
							onClick={this.createQuizHandler}
							disabled={this.state.quiz.length === 0}
						>
							Создать тест
						</Button>
					</form>
				</div>
			</div>
		)
	}
}