import { combineReducers } from 'redux'
import decks from './decks'
import fab from './fab'
import appbar from './appbar'
import user from './user'

export default combineReducers({
	decks,
	fab,
	appbar,
	user
})
