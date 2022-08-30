export default class RequestMapper {
	static async get(url) {
		const result = await fetch('/api' + url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
		const data = await result.json()
		return data
	}

	static async post(url, body) {
		return await fetch('/api' + url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})
	}

	static async update(url, body) {
		return await fetch('/api' + url, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})
	}

	static async delete(url) {
		return await fetch('/api' + url, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		})
	}
}