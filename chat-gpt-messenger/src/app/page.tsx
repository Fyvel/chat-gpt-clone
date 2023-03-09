import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'

export default function Home() {
	return (
		<main className="text-dark flex flex-col items-center justify-center h-screen px-2 my-20">
			<h1 className="text-5xl font-bold mb-20">
				Chat GPT
			</h1>
			<div className="flex space-x-2 text-center">
				<div>
					<div className="flex flex-col items-center justify-center mb-5">
						<SunIcon className="h-8 w-8" />
						<h2>Examples</h2>
					</div>
					<div className="space-y-2">
						<p className="infoText">"Explain something to me"</p>
						<p className="infoText">"What is a Rickroll?"</p>
						<p className="infoText">"Is the universe flat and what does it mean?"</p>
					</div>
				</div>
				<div>
					<div className="flex flex-col items-center justify-center mb-5">
						<BoltIcon className="h-8 w-8" />
						<h2>Capabilities</h2>
					</div>
					<div className="space-y-2">
						<p className="infoText">Remembers what user said earlier in the conversation</p>
						<p className="infoText">Allows user to provide follow-up corrections</p>
						<p className="infoText">Trained to decline inappropriate requests</p>
					</div>
				</div>
				<div>
					<div className="flex flex-col items-center justify-center mb-5">
						<ExclamationTriangleIcon className="h-8 w-8" />
						<h2>Limitations</h2>
					</div>
					<div className="space-y-2">
						<p className="infoText">May occasionally generate incorrect information</p>
						<p className="infoText">May occasionally produce harmful instructions or biased content</p>
						<p className="infoText">Limited knowledge of world and events after 2021</p>
					</div>
				</div>
			</div>
		</main>

	)
}
