import {
	RECEIVE_DECKS, ADD_DECK, DELETE_DECKS, ADD_CARD
} from '../actions/decks'

export default function decks(state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			}
		case ADD_DECK:
			return {
				...state,
				[action.deck.id]: {
					...action.deck,
					cards: {}
				}
			}
		case DELETE_DECKS:
			const filteredDecks = state

			for (let i = 0; i < action.deckIds.length; i++) {
				const deckId = action.deckIds[i]

				filteredDecks[deckId] = undefined
				delete filteredDecks[deckId]
			}

			return {
				...filteredDecks
			}
		case ADD_CARD:
			return {
				...state,
				[action.deckId]: {
					...state[action.deckId],
					cards: {
						[action.card.id]: {
							...state[action.deckId].cards,
							...action.card
						}
					}
				}
			}
		default:
			return state
	}
}
