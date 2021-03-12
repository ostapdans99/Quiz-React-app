import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import classes from "./QuizList.module.css"
import { Loader } from "../../components/UI"

export default class QuizList extends Component {
	state = {
		quizes: [],
		loading: true,
	}

	renderQuizes = () =>
		this.state.quizes.map(quiz => {
			return (
				<li key={quiz.id}>
					<NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
				</li>
			)
		})

	async componentDidMount() {
		try {
			const response = await fetch(
				"https://react-quiz-d51bc-default-rtdb.europe-west1.firebasedatabase.app/quizes.json",
			)
			const data = await response.json()

			const quizes = []

			Object.keys(data).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Тест номер: ${index + 1}`,
				})
			})

			this.setState({
				quizes,
				loading: false,
			})
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		return (
			<div className={classes.QuizList}>
				<h1>Список тестов</h1>
				{this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
			</div>
		)
	}
}
