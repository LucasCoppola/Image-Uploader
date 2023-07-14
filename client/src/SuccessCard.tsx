import { useState } from 'react'

const SuccessCard = ({ image }: { image: File | null }) => {
	const [isCopied, setIsCopied] = useState(false)
	const imageURL = image ? URL.createObjectURL(image) : ''

	const copy = () => {
		navigator.clipboard
			.writeText(imageURL)
			.then(() => setIsCopied(true))
			.catch((err) => console.error('Failed to copy text: ', err))

		setTimeout(() => {
			setIsCopied(false)
		}, 3000)
	}

	return (
		<div className="h-screen flex flex-col justify-center items-center relative">
			<div className="w-96 pb-8 bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden flex flex-col justify-center items-center">
				<div className="flex items-center justify-center h-16 ">
					<div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600">
						<span className="material-icons text-white text-4xl">done</span>
					</div>
				</div>
				<h1 className="font-semibold text-gray-700 text-center my-1 text-xl">Uploaded Successfully!</h1>
				<img src={imageURL} alt={image?.name} className="w-80 h-72 rounded-2xl my-4" />
				<div className="relative flex items-center mt-2">
					<input
						type="text"
						value={imageURL}
						className="border p-3 pr-24 w-80 rounded-lg text-gray-800 bg-blue-50 text-xs flex items-center truncate"
						readOnly
					/>
					<button
						onClick={copy}
						className="w-[5.2rem] absolute right-1 rounded-lg py-2 px-3 bg-blue-500 text-white text-xs flex items-center justify-center"
					>
						{isCopied ? 'Copied!' : 'Copy Link'}
					</button>
				</div>
			</div>
			<footer className="text-gray-500 text-xs absolute bottom-5">created by Lucas Coppola - devChallenges.io</footer>
		</div>
	)
}

export default SuccessCard
