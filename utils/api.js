import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'study-cards:decks'

export function addDeck(deck) {
	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[deck.id]: deck
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
