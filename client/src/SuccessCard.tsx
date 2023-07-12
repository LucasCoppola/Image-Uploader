const SuccessCard = () => {
	return (
		<div className="h-screen flex flex-col justify-center items-center relative">
			<div className="w-96 h-[calc(100vh-170px)] mx-auto bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden">
				<div className="flex items-center justify-center h-16 mt-5">
					<div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-600">
						<span className="material-icons text-white text-5xl">done</span>
					</div>
				</div>
			</div>
			<footer className="text-gray-500 text-xs absolute bottom-5">
				created by Lucas Coppola - devChallenges.io
			</footer>
		</div>
	)
}

export default SuccessCard
