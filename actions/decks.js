// Polyfill for getRandomValues() for react native
import 'react-native-get-random-values'

// Seems like uuid v > 3 doesn't work well with react-native-get-random-values.
// For more information, check out this issue: https://github.com/uuidjs/uuid/issues/375
import { v4 as uuid } from 'uuid'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'

export function receiveDecks(decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	}
}

export function newDeck(deck) {
	return {
		type: ADD_DECK,
		deck
	}
}

export function handleNewDeck(deckName) {
	return (dispatch) => {
		const deck = {
			id: uuid(),
			name: deckName
		}

		dispatch(newDeck(deck))

		return deck
	}
}
