import SvgImage from './SvgImage'

const DragDrop = () => {
	return (
		<div className="bg-[#f4fdff] flex items-center justify-center rounded-lg">
			<label
				htmlFor="dropzone-file"
				className="flex w-80 flex-col items-center justify-center h-52 border-2 border-blue-100 border-dashed rounded-lg cursor-pointer hover:bg-blue-50"
			>
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<SvgImage />
					<p className="text-xs text-gray-500 mt-8">Drag & Drop your image here</p>
				</div>
				<input id="dropzone-file" type="file" className="hidden" />
			</label>
		</div>
	)
}

export default DragDrop
