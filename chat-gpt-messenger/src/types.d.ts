type Message = {
	speaker: 'User' | 'AI',
	message: string,
	createdAt: admin.firestore.Timestamp,
	user: {
		_id: string,
		name: string,
		avatar: string,
	}
}