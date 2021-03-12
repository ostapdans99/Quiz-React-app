import "./App.css"
import { Route, Switch } from "react-router-dom"
import { Layout } from "./hoc/Layout"
import { Quiz } from "./containers"
import { Auth } from "./containers"
import { QuizList } from "./containers"
import { QuizCreator } from "./containers"

function App() {
	return (
		<Layout>
			<Switch>
				<Route path="/auth" component={Auth}></Route>
				<Route path="/quiz-creator" component={QuizCreator}></Route>
				<Route path="/quiz/:id" component={Quiz}></Route>
				<Route path="/" component={QuizList}></Route>
			</Switch>
		</Layout>
	)
}

export default App
