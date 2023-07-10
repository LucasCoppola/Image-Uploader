import { useRef, useState } from 'react'

const App = () => {
	const [image, setImage] = useState<File | null>(null)
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const handleFileButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		const files = e.target.files
		try {
			if (files && files.length > 0) {
				const file = files[0]
				const formData = new FormData()
				formData.append('image', file)

				const response = await fetch('http://localhost:3000/upload', {
					method: 'POST',
					body: formData
				})

				if (response.ok) {
					// Image uploaded successfully
					setImage(file)
				} else {
					// Handle error response
					throw new Error('Image upload failed')
				}
			}
		} catch (error) {
			console.log(error)
			alert('Something went wrong')
		}
	}

	console.log(image?.name)

	return (
		<div className="h-screen flex flex-col justify-center items-center relative">
			<div className="w-96 h-[calc(100vh-170px)] mx-auto bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden">
				<div className="px-8 py-4 flex flex-col items-center">
					<h1 className="font-semibold text-gray-700 text-xl my-4">Upload your image</h1>
					<h4 className="text-gray-500 text-xs">File should be Jpeg, Png...</h4>
					<div className="flex items-center justify-center mt-4">{/* DragDrop component */}</div>
					<img src={image ? URL.createObjectURL(image) : ''} alt="" />
					<p className="text-gray-500 text-xs my-4">Or</p>
					<form action="/upload" method="post" encType="multipart/form-data">
						<input
							type="file"
							name="image"
							ref={fileInputRef}
							accept="image/png, image/jpeg"
							style={{ display: 'none' }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileInputChange(e)}
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
