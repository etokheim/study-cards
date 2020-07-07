import { UPDATE_FAB } from '../actions/fab'

export default function decks(state = {}, action) {
	switch (action.type) {
		case UPDATE_FAB:
			return {
				...state,
				visible: action.visible
			}
		default:
			return state
	}
}
