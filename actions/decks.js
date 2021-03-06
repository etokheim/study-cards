// Polyfill for getRandomValues() for react native
import 'react-native-get-random-values'

// Seems like uuid v > 3 doesn't work well with react-native-get-random-values.
// For more information, check out this issue: https://github.com/uuidjs/uuid/issues/375
import { v4 as uuid } from 'uuid'
import * as api from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECKS = 'DELETE_DECKS'
export const ANSWER_CARD = 'ANSWER_CARD'
export const FINISH_QUIZ = 'FINISH_QUIZ'

export function receiveDecks(decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	}
}

function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck
	}
}

export function handleAddDeck(deckName) {
	return async (dispatch) => {
		const deck = {
			id: uuid(),
			name: deckName,
			cards: {},
			created: Date.now(),
			results: {}
		}

		dispatch(addDeck(deck))

		api.addDeck(deck)

		return deck
	}
}

function deleteItems(deckIds) {
	return {
		type: DELETE_DECKS,
		deckIds
	}
}

export function handleDeleteItems(deckIds) {
	return async (dispatch) => {
		dispatch(deleteItems(deckIds))

		api.removeDeck(deckIds)

		return deckIds
	}
}

function addCard(card, deckId) {
	return {
		type: ADD_CARD,
		card,
		deckId
	}
}

export function handleAddCard(question, answer, deckId) {
	return async (dispatch) => {
		const card = {
			id: uuid(),
			question,
			answer,
			answers: [],
			created: Date.now()
		}

		dispatch(addCard(card, deckId))

		api.addCard(card, deckId)

		return card
	}
}

function answerCard(cardId, deckId, answer) {
	return {
		type: ANSWER_CARD,
		cardId,
		deckId,
		answer
	}
}

export function handleAnswerCard(cardId, deckId, option) {
	return async (dispatch) => {
		const answer = {
			id: uuid(),
			option,
			timestamp: Date.now()
		}

		dispatch(answerCard(cardId, deckId, answer))

		api.answerCard(cardId, deckId, answer)

		return answer
	}
}

function finishQuiz(deckId, result) {
	return {
		type: FINISH_QUIZ,
		deckId,
		result
	}
}

export function handleFinishQuiz(deckId, startTime, questionCount, correctCount) {
	return async (dispatch) => {
		const result = {
			startTime,
			endTime: Date.now(),
			questionCount,
			correctCount
		}

		dispatch(finishQuiz(deckId, result))

		api.finishQuiz(deckId, result)

		return result
	}
}
