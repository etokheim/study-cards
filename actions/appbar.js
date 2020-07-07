export const SHOW_APPBAR = 'SHOW_APPBAR'
export const SELECT_ITEM = 'SELECT_ITEM'
export const DESELECT_ITEM = 'DESELECT_ITEM'

export function toggleAppbar(visible) {
	return {
		type: SHOW_APPBAR,
		visible
	}
}

export function selectItem(id) {
	return {
		type: SELECT_ITEM,
		id
	}
}

export function deselectItem(id) {
	return {
		type: DESELECT_ITEM,
		id
	}
}
