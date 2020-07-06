// This is to battle: Error: EPERM: operation not permitted, lstat
// Credits to llenn (https://forums.expo.io/t/error-eperm-operation-not-permitted-lstat/19221)
const getBlacklistRE = function getBlacklistRE() {
	return new RegExp('(.*\\android\\.*|.*\\__fixtures__\\.*|node_modules[\\\\]react[\\\\]dist[\\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$')
}

module.exports = {
	resolver: {
		blacklistRE: getBlacklistRE()
	}
}
