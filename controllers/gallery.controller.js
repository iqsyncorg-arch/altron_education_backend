const Gallery = require('../models/Gallery.model');
const { cloudinary } = require('../middleware/cloudinary.config');

exports.getImages = async (req, res) => {
    try {
        const images = await Gallery.find({}).sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });

        // Delete from Cloudinary if publicId exists
        if (image.publicId) {
            await cloudinary.uploader.destroy(image.publicId);
        }

        const deleted = await Gallery.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Image not found' });

        res.json({ message: 'Image deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createImage = async (req, res) => {
    console.log('--- Create Image Backend Started ---');
    console.log('Request Body:', req.body);

    try {
        if (!req.file) {
            console.error('No file found in req.file!');
            return res.status(400).json({ message: 'No image file provided' });
        }

        console.log('File received from Multer:', {
            path: req.file.path,
            filename: req.file.filename,
            size: req.file.size
        });

        const newImage = await Gallery.create({
            imageUrl: req.file.path,
            publicId: req.file.filename,
            caption: req.body.caption
        });

        console.log('Data saved to MongoDB:', newImage);
        console.log('--- Create Image Backend Success ---');
        res.status(201).json(newImage);
    } catch (err) {
        console.error('Create Image Backend Error:', err.message);
        res.status(500).json({ message: err.message });
    }
};

