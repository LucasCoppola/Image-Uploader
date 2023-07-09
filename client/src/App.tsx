import { useRef } from 'react'
import DragDrop from './Drag&Drop'

const App = () => {
	const fileInputRef = useRef<HTMLInputElement | undefined>(null)

	const handleFileButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files
		// Do something with the selected file
		console.log(file)
	}
	return (
		<div className="h-screen flex flex-col justify-center items-center relative">
			<div className="w-96 h-[calc(100vh-170px)] mx-auto bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden">
				<div className="px-8 py-4 flex flex-col items-center">
					<h1 className="font-semibold text-gray-700 text-xl my-4">Upload your image</h1>
					<h4 className="text-gray-500 text-xs">File should be Jpeg, Png...</h4>
					<div className="flex items-center justify-center mt-4">
						<DragDrop />
					</div>
					<p className="text-gray-500 text-xs my-4">Or</p>
					<form action="/upload" method="post" encType="multipart/form-data">
						<input
							type="file"
							name="avatar"
							ref={fileInputRef}
							style={{ display: 'none' }} // Hide the default file input
							onChange={handleFileInputChange}
						/>
					</form>
					<button className="bg-blue-600 mb-3 text-white px-4 py-2 rounded-lg text-sm" onClick={handleFileButtonClick}>
						Choose a File
					</button>
				</div>
			</div>
			<footer className="text-gray-500 text-xs absolute bottom-5">created by Lucas Coppola - devChallenges.io</footer>
		</div>
	)
}

export default App
