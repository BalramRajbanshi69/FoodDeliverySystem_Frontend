const express = require('express');
const path = require('path');
const fs = require('fs');
const { upload } = require('./middleware/multerConfig');

const app = express();

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log('=== REQUEST DEBUG ===');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
    console.log('Body keys:', Object.keys(req.body || {}));
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test the uploads directory
const uploadsPath = path.join(__dirname, 'uploads');
console.log('Uploads directory path:', uploadsPath);
console.log('Uploads directory exists:', fs.existsSync(uploadsPath));

if (fs.existsSync(uploadsPath)) {
    const stats = fs.statSync(uploadsPath);
    console.log('Directory permissions:', stats.mode.toString(8));
    console.log('Directory is writable:', (stats.mode & parseInt('200', 8)) !== 0);
}

// Simple test route
app.post('/test-upload', upload.single('productImage'), (req, res) => {
    console.log('=== UPLOAD HANDLER ===');
    console.log('File object:', req.file);
    console.log('Body:', req.body);
    console.log('Files in uploads directory:', fs.readdirSync(uploadsPath));
    
    if (req.file) {
        res.json({
            success: true,
            message: 'File uploaded successfully',
            file: req.file,
            savedTo: req.file.path
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
    }
});

// Error handler
app.use((error, req, res, next) => {
    console.log('=== ERROR HANDLER ===');
    console.log('Error:', error);
    res.status(500).json({
        success: false,
        error: error.message
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
    console.log(`Test upload with: curl -X POST -F "productImage=@path/to/image.jpg" http://localhost:${PORT}/test-upload`);
});