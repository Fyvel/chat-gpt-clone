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

type Option = {
	value: string,
	label: string,
}

type ModelsData = {
	options: Option[],
}
