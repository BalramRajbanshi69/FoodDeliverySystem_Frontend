const express = require("express");
const { upload } = require("../../middleware/multerConfig");
const {
    createProduct,
    editProduct,
    deleteProduct,
    updateProductStatus,
    updateProductStockAndPrice,
    getOrdersOfProduct
} = require("../../controller/admin/productController");

const router = express.Router();

// Middleware for authentication (you'll need to implement this)
// const { isAuthenticated, restrictTo } = require("../../middleware/authMiddleware");

// Create product with image upload
router.post("/create", upload.single("productImage"), createProduct);

// Edit product with optional image upload
router.patch("/edit/:id", upload.single("productImage"), editProduct);

// Delete product
router.delete("/delete/:id", deleteProduct);

// Update product status
router.patch("/status/:id", updateProductStatus);

// Update product stock and price
router.patch("/stock-price/:id", updateProductStockAndPrice);

// Get orders of a specific product
router.get("/orders/:id", getOrdersOfProduct);

module.exports = router;