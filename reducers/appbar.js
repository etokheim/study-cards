import { SHOW_APPBAR, SELECT_ITEM, DESELECT_ITEM } from '../actions/appbar'
import { DELETE_DECKS } from '../actions/decks'

export default function decks(state = { selected: [] }, action) {
	switch (action.type) {
		case SHOW_APPBAR:
			return {
				...state,
				visible: action.visible
			}
		case SELECT_ITEM:
			return {
				...state,
				selected: state.selected.concat(action.id)
			}
		case DESELECT_ITEM:
			return {
				...state,
				selected: state.selected.filter((item) => action.id !== item)
			}
		case DELETE_DECKS:
			return {
				...state,
				selected: []
			}
		default:
			return state
	}
}
