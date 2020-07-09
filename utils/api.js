import { AsyncStorage } from 'react-native'

const USER_STORAGE_KEY = 'study-cards:user'
const DECK_STORAGE_KEY = 'study-cards:decks'

export function createUser(user) {
	return AsyncStorage.mergeItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export async function getUser() {
	let user = await AsyncStorage.getItem(USER_STORAGE_KEY)

	user = JSON.parse(user)

	return user
}

export async function removeUser() {
	await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify({}))
	return true
}

export function addDeck(deck) {
	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[deck.id]: deck
	}))
}

export async function addCard(card, deckId) {
	let decks = await AsyncStorage.getItem(DECK_STORAGE_KEY)

	decks = JSON.parse(decks)

	const deck = decks[deckId]

	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[deckId]: {
			...deck,
			cards: {
				...deck.cards,
				[card.id]: {
					...card
				}
			}
		}
	}))
}

export async function answerCard(cardId, deckId, answer) {
	let decks = await AsyncStorage.getItem(DECK_STORAGE_KEY)

	decks = JSON.parse(decks)

	const deck = decks[deckId]

	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[deckId]: {
			...deck,
			cards: {
				...deck.cards,
				[cardId]: {
					...deck.cards[cardId],
					answers: deck.cards[cardId].answers.concat(answer)
				}
			}
		}
	}))
}

export async function finishQuiz(deckId, result) {
	let decks = await AsyncStorage.getItem(DECK_STORAGE_KEY)

	decks = JSON.parse(decks)

	const deck = decks[deckId]

	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[deckId]: {
			...deck,
			results: {
				...deck.results,
				[result.startTime]: {
					...result
				}
			}
		}
	}))
}

export async function removeDeck(ids) {
	let decks = await AsyncStorage.getItem(DECK_STORAGE_KEY)

	decks = JSON.parse(decks)

	ids.forEach((id) => {
		decks[id] = undefined
		delete decks[id]
	})

	const returnData = await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))

	return decks
}

export async function getAllDecks() {
	let decks = await AsyncStorage.getItem(DECK_STORAGE_KEY)
	decks = JSON.parse(decks)

	return decks
}

export async function removeAllDecks() {
	await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({}))

	return {}
}

export function reset() {
	removeAllDecks()
	removeUser()
}
