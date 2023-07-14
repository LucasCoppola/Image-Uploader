"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/public', express_1.default.static('public'));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.post('/upload', upload.single('image'), function (req, res) {
    if (req.file) {
        const imageUrl = `http://localhost:3000/public/${req.file.filename}`;
        res.status(200).json({ message: 'Image uploaded', url: imageUrl });
    }
    else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});
app.listen(3000, () => {
    console.log('Express server started on port 3000');
});
