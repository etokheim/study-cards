import {
	RECEIVE_DECKS, ADD_DECK, DELETE_DECKS, ADD_CARD, ANSWER_CARD, FINISH_QUIZ
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
					...action.deck
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
						...state[action.deckId].cards,
						[action.card.id]: {
							...action.card
						}
					}
				}
			}
		case ANSWER_CARD:
			return {
				...state,
				[action.deckId]: {
					...state[action.deckId],
					cards: {
						...state[action.deckId].cards,
						[action.cardId]: {
							...state[action.deckId].cards[action.cardId],
							answers: state[action.deckId].cards[action.cardId].answers.concat(action.answer)
						}
					}
				}
			}
		case FINISH_QUIZ:
			return {
				...state,
				[action.deckId]: {
					...state[action.deckId],
					results: {
						...state.results,
						[action.result.startTime]: action.result
					}
				}
			}
		default:
			return state
	}
}
