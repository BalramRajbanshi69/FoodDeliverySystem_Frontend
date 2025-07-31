const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
console.log('Uploads directory path:', uploadsDir);

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory');
} else {
    console.log('Uploads directory already exists');
}

// Simple multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Setting destination to:', uploadsDir);
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.originalname;
        console.log('Setting filename to:', filename);
        cb(null, filename);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log('File received:', file);
        console.log('File mimetype:', file.mimetype);
        console.log('File original name:', file.originalname);
        
        // Accept any file for testing
        cb(null, true);
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.post('/upload-test', upload.single('productImage'), (req, res) => {
    console.log('\n=== UPLOAD ATTEMPT ===');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    if (req.file) {
        console.log('SUCCESS: File uploaded to:', req.file.path);
        console.log('Files in uploads directory:', fs.readdirSync(uploadsDir));
        
        res.json({
            success: true,
            message: 'File uploaded successfully!',
            file: req.file,
            filesInDirectory: fs.readdirSync(uploadsDir)
        });
    } else {
        console.log('FAILURE: No file received');
        res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
    }
});

// Error handler
app.use((error, req, res, next) => {
    console.log('\n=== ERROR ===');
    console.log('Error message:', error.message);
    console.log('Error stack:', error.stack);
    
    res.status(500).json({
        success: false,
        error: error.message
    });
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Simple test server running on port ${PORT}`);
    console.log(`Test with: curl -X POST -F "productImage=@test-image.jpg" http://localhost:${PORT}/upload-test`);
    console.log('Or use Postman to send a POST request with form-data');
});