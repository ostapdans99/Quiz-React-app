import "./App.css"
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import React, { Component } from "react"
import { Layout } from "./hoc/Layout"
import { Quiz } from "./containers"
import { Auth } from "./containers"
import { QuizList } from "./containers"
import { QuizCreator } from "./containers"
import { connect } from "react-redux"
import { Logout } from "./components"
import { autologin } from "./store/actions"

class App extends Component {
	componentDidMount() {
		this.props.autologin()
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={Auth}></Route>
				<Route path="/quiz/:id" component={Quiz}></Route>
				<Route path="/" exact component={QuizList}></Route>
				<Redirect to="/" />
			</Switch>
		)

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/quiz-creator" component={QuizCreator}></Route>
					<Route path="/quiz/:id" component={Quiz}></Route>
					<Route path="/logout" component={Logout}></Route>
					<Route path="/" exact component={QuizList}></Route>
					<Redirect to="/" />
				</Switch>
			)
		}
		return <Layout>{routes}</Layout>
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.token,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		autologin: () => dispatch(autologin()),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
