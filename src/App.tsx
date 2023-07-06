import DragDrop from './Drag&Drop'

const App = () => {
	return (
		<div className="h-screen flex flex-col justify-center items-center relative">
			<div className="w-96 h-96 mx-auto px-8 py-4 bg-white rounded-lg shadow-md flex flex-col items-center">
				<h1>Upload your image</h1>
				<h4>Image should be Jpeg, Png...</h4>
				<div className="flex items-center justify-center mt-4">
					<DragDrop />
				</div>
				<p>Or</p>
				<button>Choose a File</button>
			</div>
			<footer className="text-gray-500 text-xs absolute bottom-5">created by Lucas Coppola - devChallenges.io</footer>
		</div>
	)
}

export default App
