"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cloudinary_1 = require("cloudinary");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.post('/upload', upload.single('file'), function (req, res, next) {
    const file = req.file;
    if (!file)
        return res.status(400).json({ error: 'Please upload an image' });
    cloudinary_1.v2.uploader.upload(file.path, function (error, result) {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to upload image' });
        }
        const imageUrl = result === null || result === void 0 ? void 0 : result.secure_url;
        res.json({ imageUrl });
    });
});
app.listen(3000, () => {
    console.log('Express server started on port 3000');
});
