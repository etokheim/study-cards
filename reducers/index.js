import { combineReducers } from 'redux'
import decks from './decks'
import fab from './fab'
import appbar from './appbar'

export default combineReducers({
	decks,
	fab,
	appbar
})
