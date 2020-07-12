import { v4 as uuid } from 'uuid'
import * as api from '../utils/api'
import { handleAddCard, handleAddDeck } from './decks'

export const CREATE_USER = 'CREATE_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

function createUser(user) {
	return {
		type: CREATE_USER,
		user
	}
}

export function receiveUser(user) {
	return {
		type: RECEIVE_USER,
		user
	}
}

export function handleCreateUser(username) {
	return async (dispatch) => {
		// First we will create the how-to deck
		createInitialDeck(dispatch)

		const user = {
			id: uuid(),
			name: username,
			answers: {}
		}

		dispatch(createUser(user))

		api.createUser(user)

		return user
	}
}

async function createInitialDeck(dispatch) {
	const deck = await dispatch(handleAddDeck('Get started'))

	const cards = [{
		question: 'What is the Study Cards app?',
		answer: `Study Cards is an app made to help you study.

The app lets you make your own decks of quiz cards.

Press Correct or incorrect to continue.`
	}, {
		question: 'How do I make a quiz?',
		answer: `First you have to create your deck. Say you have a science test at school, then you could call the deck 'Science'.

When you have your deck, you add quiz cards to that deck. Each card has a question and an answer.`
	}, {
		question: 'How do you make quiz cards?',
		answer: `Open the deck you want to add a card to and click 'Add card'

Seems easy enough, right? 😎`
	}, {
		question: 'Why use this app?',
		answer: `1. Keep track of your score and track your learning progress

2. Access your quiz everywhere – on the bus, train or toilet, if you have 5 minutes you can study anywhere

3. Share your quizzes with your friends`
	}, {
		question: 'Are you ready to get started? 🚀',
		answer: `Of course you are – you are pretty smart after all! 🤗

Just answer this question to finish the 'Getting started quiz', and go back to the deck page`
	}]

	for await (const card of cards) {
		dispatch(handleAddCard(card.question, card.answer, deck.id))
	}
}
