import express, { Express, NextFunction, Request, Response } from 'express'
import path from 'path'
import multer from 'multer'
import bodyParser from 'body-parser'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'

const app: Express = express()
app.use(cors())
app.use(bodyParser.json())

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
})

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now())
	}
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), function (req: Request, res: Response, next: NextFunction) {
	console.log('hello')
	// const file: Express.Multer.File | undefined = req.file
	// if (!file) return res.status(400).json({ error: 'Please upload an image' })

	// cloudinary.uploader.upload(file.path, function (error, result) {
	// 	if (error) {
	// 		console.error(error)
	// 		return res.status(500).json({ error: 'Failed to upload image' })
	// 	}
	// 	const imageUrl = result?.secure_url
	// 	res.json({ imageUrl })
	// })
})

app.listen(3000, () => {
	console.log('Express server started on port 3000')
})
