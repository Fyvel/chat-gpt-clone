import { DocumentData } from 'firebase/firestore'

type MessageProps = {
	message: DocumentData
}
export default function Message({ message }: MessageProps) {
	const isAI = message.speaker === 'AI'
	return (
		<div className={`py-5 text-white ${isAI && 'bg-[#434654]'}`}>
			<div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
				<div className='min-w-[2rem] h-8 w-8'>
					<picture>
						<img
							className='w-full h-full object-cover rounded-lg'
							src={message.user.avatar}
							alt={message.user.name} />
					</picture>
				</div>
				<p className='pt-1 text-sm'>
					{message.message}
				</p>
			</div >
		</div >
	)
}