export const SHOW_APPBAR = 'SHOW_APPBAR'

export function toggleAppbar(visible) {
	return {
		type: SHOW_APPBAR,
		visible
	}
}
