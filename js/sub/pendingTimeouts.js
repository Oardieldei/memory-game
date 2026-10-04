let pendingIds = []

export function schedule(callback, delay) {
	const id = setTimeout(() => {
		pendingIds = pendingIds.filter((item) => item !== id)
		callback()
	}, delay)

	pendingIds.push(id)
	return id
}

export function cancelPending() {
	pendingIds.forEach((id) => clearTimeout(id))
	pendingIds = []
}