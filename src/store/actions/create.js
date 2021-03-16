import { CREATE_QUIZ_QUESTION, RESERT_QUIZ_CREATION } from "./actionTypes"

export function createQuizQuestion(item) {
	return {
		type: CREATE_QUIZ_QUESTION,
		item,
	}
}

export function resetQuizCreation() {
	return {
		type: RESERT_QUIZ_CREATION,
	}
}

export function finishCreateQuiz() {
	return async (dispatch, getState) => {
		let postData = getState().create.quiz

		await fetch(
			"https://react-quiz-d51bc-default-rtdb.europe-west1.firebasedatabase.app/quizes.json",
			{ method: "POST", body: JSON.stringify(postData) },
		)

		dispatch(resetQuizCreation())
	}
}
