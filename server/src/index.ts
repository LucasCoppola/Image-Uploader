import express, { Express, Request, Response } from 'express'
import path from 'path'
import multer from 'multer'
import bodyParser from 'body-parser'
import cors from 'cors'

const app: Express = express()
app.use(cors())
app.use(bodyParser.json())

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('image'), function (req: Request, res: Response) {
	if (req.file) {
		res.status(200).json({ message: 'Image uploaded' })
	} else {
		res.status(400).json({ error: 'No file uploaded' })
	}
})

app.listen(3000, () => {
	console.log('Express server started on port 3000')
})
