import { SHOW_APPBAR } from '../actions/appbar'

export default function decks(state = {}, action) {
	switch (action.type) {
		case SHOW_APPBAR:
			return {
				...state,
				visible: action.visible
			}
		default:
			return state
	}
}
