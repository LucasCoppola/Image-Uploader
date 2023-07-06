import SvgImage from './SvgImage'

const DragDrop = () => {
	return (
		<div className="bg-blue-50 flex items-center justify-center">
			<label
				htmlFor="dropzone-file"
				className="flex w-80 flex-col items-center justify-center h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
			>
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<SvgImage />
					<p className="text-xs text-gray-500">Drag & Drop your image here</p>
				</div>
				<input id="dropzone-file" type="file" className="hidden" />
			</label>
		</div>
	)
}

export default DragDrop
