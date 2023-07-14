import { useEffect, useRef, useState } from "react"
import DragDrop from "./Drag&Drop"
import SuccessCard from "./SuccessCard"

interface Data {
	message: string
	url: string
}

const App = () => {
	const [image, setImage] = useState<File | string>("")
	const [isLoading, setIsLoading] = useState(false)
	const [isUploaded, setIsUploaded] = useState(false)
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const handleFileButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		const files = e.target.files
		setIsLoading(true)
		try {
			if (files && files.length > 0) {
				const file = files[0]
				if (!file.type || file.type === "" || !file.type.startsWith("image/") || file.size === 0) {
					alert("Please upload an image file")
					return
				}
				const formData = new FormData()
				formData.append("image", file)

				const response = await fetch(String(import.meta.env.VITE_API), {
					method: "POST",
					body: formData,
				})
				if (response.ok) {
					const data = (await response.json()) as Data
					setImage(data.url)
				} else {
					throw new Error("Image upload failed")
				}
			}
		} catch (error) {
			console.log(error)
			alert("Something went wrong")
		}
	}

	useEffect(() => {
		let timeoutId = Date.now()
		if (image) {
			setIsLoading(true)
			timeoutId = setTimeout(() => {
				setIsLoading(false)
				if (image) {
					setIsUploaded(true)
				}
			}, 1000)
		}
		return () => {
			clearTimeout(timeoutId)
		}
	}, [image])

	return isLoading ? (
		<div className="flex items-center justify-center h-screen">
			<div className="w-96 bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden">
				<div className="h-32 flex flex-col items-center justify-center">
					<h1 className="mr-auto ml-8 font-semibold text-gray-700 text-xl mb-6">Uploading...</h1>
					<div className="w-80 h-1 bg-gray-300 rounded">
						<div className="h-full bg-blue-500 animate-progress"></div>
					</div>
				</div>
			</div>
		</div>
	) : isUploaded ? (
		<SuccessCard image={image} />
	) : (
		<div className="h-screen flex flex-col justify-center items-center relative">
			<div className="w-96 h-auto mx-auto bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden">
				<div className="px-8 py-4 flex flex-col items-center">
					<h1 className="font-semibold text-gray-700 text-xl my-4">Upload your image</h1>
					<h4 className="text-gray-500 text-xs">File should be Jpeg, Png...</h4>
					<div className="flex items-center justify-center mt-4">
						<DragDrop setImage={setImage} />
					</div>
					<p className="text-gray-500 text-xs my-4">Or</p>
					<form action="/upload" method="post" encType="multipart/form-data">
						<input
							type="file"
							name="image"
							ref={fileInputRef}
							accept="image/*"
							style={{ display: "none" }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								handleFileInputChange(e).catch((e) => console.error(e))
							}}
						/>
					</form>
					<button
						className="bg-blue-600 mb-3 text-white px-4 py-2 rounded-lg text-sm"
						onClick={handleFileButtonClick}>
						Choose a File
					</button>
				</div>
			</div>
			<footer className="text-gray-500 text-xs absolute bottom-5">
				created by Lucas Coppola - devChallenges.io
			</footer>
		</div>
	)
}

export default App
