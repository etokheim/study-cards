import { v4 as uuid } from 'uuid'
import * as api from '../utils/api'

export const CREATE_USER = 'CREATE_USER'

function createUser(user) {
	return {
		type: CREATE_USER,
		user
	}
}

export function handleCreateUser(username) {
	return async (dispatch) => {
		const user = {
			id: uuid(),
			name: username,
			answers: {}
		}

		dispatch(createUser(user))

		// api.createUser(user)

		return user
	}
}
