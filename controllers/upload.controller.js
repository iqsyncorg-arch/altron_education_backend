exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Return the Cloudinary URL and public ID
        res.status(200).json({
            url: req.file.path,
            public_id: req.file.filename
        });
    } catch (error) {
        console.error('Upload Controller Error:', error);
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
};
