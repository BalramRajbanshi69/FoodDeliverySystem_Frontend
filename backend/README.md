# Backend Image Upload Fix

## Issues Fixed

### 1. **Uploads Directory Missing**
- **Problem**: The uploads folder didn't exist, causing multer to fail when trying to save files
- **Fix**: Added automatic directory creation in `multerConfig.js`
- **Code**: 
```javascript
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
```

### 2. **Multer Configuration Issues**
- **Problem**: Original config didn't handle errors properly and used relative paths incorrectly
- **Fix**: 
  - Added proper error handling for file types
  - Used absolute paths for file storage
  - Added file size limits (5MB)
  - Improved filename generation for uniqueness

### 3. **Route Middleware Integration**
- **Problem**: Multer middleware wasn't properly integrated with routes
- **Fix**: Created proper route structure with `upload.single("productImage")` middleware

### 4. **Static File Serving**
- **Problem**: Server wasn't configured to serve uploaded images
- **Fix**: Added `app.use("/uploads", express.static(path.join(__dirname, "uploads")));`

### 5. **Error Handling**
- **Problem**: No proper error handling for upload failures
- **Fix**: Added comprehensive error handling for:
  - File size limits
  - Invalid file types
  - Upload failures
  - File cleanup on errors

## File Structure
```
backend/
├── uploads/                    # Directory for uploaded images
├── middleware/
│   └── multerConfig.js        # Fixed multer configuration
├── controller/admin/
│   └── productController.js   # Fixed product controller
├── routes/admin/
│   └── productRoute.js        # Routes with multer middleware
├── server.js                  # Main server with static file serving
└── package.json              # Dependencies
```

## How to Test

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start the Server
```bash
npm run dev
# or
npm start
```

### 3. Test Image Upload
Use a tool like Postman or curl to test:

```bash
curl -X POST http://localhost:4000/api/products/create \
  -F "productImage=@/path/to/your/image.jpg" \
  -F "productName=Test Product" \
  -F "productDescription=Test Description" \
  -F "productPrice=100" \
  -F "productStockQuantity=10" \
  -F "productStatus=available"
```

### 4. Verify Upload
- Check the `backend/uploads/` folder for the uploaded file
- The response should include the image path: `/uploads/filename.jpg`
- Access the image via: `http://localhost:4000/uploads/filename.jpg`

## Frontend Integration

Update your frontend to send FormData:

```javascript
const formData = new FormData();
formData.append('productImage', imageFile);
formData.append('productName', productName);
formData.append('productDescription', productDescription);
formData.append('productPrice', productPrice);
formData.append('productStockQuantity', productStockQuantity);
formData.append('productStatus', productStatus);

fetch('http://localhost:4000/api/products/create', {
  method: 'POST',
  body: formData,
  headers: {
    'Authorization': `Bearer ${token}` // if using authentication
  }
});
```

## Key Changes Made

1. **multerConfig.js**: Complete rewrite with proper error handling
2. **productController.js**: Added file cleanup and better error handling
3. **productRoute.js**: Proper middleware integration
4. **server.js**: Added static file serving and global error handling
5. **Directory structure**: Created uploads folder with proper permissions

## Common Issues & Solutions

### Issue: "ENOENT: no such file or directory"
**Solution**: The uploads directory is now created automatically

### Issue: "File not uploading"
**Solution**: Ensure you're using FormData and the correct field name "productImage"

### Issue: "Cannot access uploaded images"
**Solution**: Static file serving is now properly configured

### Issue: "File type not supported"
**Solution**: Only JPG, PNG, and JPEG files are allowed (configurable in multerConfig.js)

The image upload functionality should now work correctly with proper error handling and file management.