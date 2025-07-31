const Order = require("../../model/orderModel");
const Product = require("../../model/productModel");
const fs = require("fs").promises;
const User = require("../../model/userModel");
const path = require("path");

exports.createProduct = async (req, res) => {
    try {
        const userId = req.user?.id;
        const file = req.file;
        let imageRelativePath;

        if (!file) {
            imageRelativePath = "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";
        } else {
            // Store relative path for uploaded file
            imageRelativePath = `/uploads/${file.filename}`;
        }

        const {
            productName,
            productDescription,
            productPrice,
            productStockQuantity,
            productStatus,
        } = req.body;

        if (
            !productName ||
            !productDescription ||
            !productPrice ||
            !productStockQuantity ||
            !productStatus
        ) {
            // If there was an uploaded file but validation fails, clean it up
            if (file) {
                try {
                    await fs.unlink(file.path);
                } catch (err) {
                    console.error("Error cleaning up uploaded file:", err);
                }
            }
            
            return res.status(400).json({
                message: "Please provide productName, productDescription, productPrice, productStockQuantity, productStatus",
            });
        }

        const productData = await Product.create({
            productName,
            productDescription,
            productPrice,
            productStockQuantity,
            productStatus,
            productImage: [imageRelativePath],
            user: userId
        });

        res.status(201).json({
            message: "Product added successfully",
            data: productData,
        });
    } catch (error) {
        // Clean up uploaded file if there was an error
        if (req.file) {
            try {
                await fs.unlink(req.file.path);
            } catch (err) {
                console.error("Error cleaning up uploaded file:", err);
            }
        }
        
        console.error("Create product error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, productDescription, productPrice, productStatus, productStockQuantity } = req.body;

        if (!productName || !productDescription || !productPrice || !productStatus || !productStockQuantity || !id) {
            // Clean up uploaded file if validation fails
            if (req.file) {
                try {
                    await fs.unlink(req.file.path);
                } catch (err) {
                    console.error("Error cleaning up uploaded file:", err);
                }
            }
            
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        const oldData = await Product.findById(id);
        if (!oldData) {
            // Clean up uploaded file if product not found
            if (req.file) {
                try {
                    await fs.unlink(req.file.path);
                } catch (err) {
                    console.error("Error cleaning up uploaded file:", err);
                }
            }
            
            return res.status(404).json({
                message: "No data found with that id"
            });
        }

        // Security check: Only the product creator can edit it
        if (oldData.user.toString() !== req.user.id) {
            // Clean up uploaded file if unauthorized
            if (req.file) {
                try {
                    await fs.unlink(req.file.path);
                } catch (err) {
                    console.error("Error cleaning up uploaded file:", err);
                }
            }
            
            return res.status(401).json({ 
                error: "You are not authorized to edit this product" 
            });
        }

        const oldProductImage = oldData.productImage[0];
        
        let newImageRelativePath;
        if (req.file && req.file.filename) {
            // Delete the old file if it's not a URL
            if (oldProductImage && !oldProductImage.startsWith("http")) {
                const oldFilePath = path.join(__dirname, "../..", oldProductImage);
                try {
                    await fs.unlink(oldFilePath);
                    console.log("Old file deleted successfully");
                } catch (err) {
                    console.error("Error deleting old file:", err);
                }
            }
            
            // Store the new image path as a relative path
            newImageRelativePath = `/uploads/${req.file.filename}`;
        } else {
            newImageRelativePath = oldProductImage;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            productName,
            productDescription,
            productPrice,
            productStatus,
            productStockQuantity,
            productImage: [newImageRelativePath]
        }, {
            new: true,
        });

        res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        // Clean up uploaded file if there was an error
        if (req.file) {
            try {
                await fs.unlink(req.file.path);
            } catch (err) {
                console.error("Error cleaning up uploaded file:", err);
            }
        }
        
        console.error("Edit product error:", error);
        res.status(500).json({ 
            error: "Internal server error",
            message: error.message 
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Please provide product ID" });
        }

        // Find the product to get its image path
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Extract the relative path for the image
        let imagePath = product.productImage;
        let relativeFilePath = null;

        // Handle case where productImage is an array
        if (Array.isArray(imagePath)) {
            imagePath = imagePath[0]; // Take the first image if it's an array
        }

        if (imagePath && typeof imagePath === "string" && !imagePath.startsWith("http")) {
            // Assume imagePath is a relative path (e.g., "/uploads/filename.jpg")
            relativeFilePath = imagePath.startsWith("/uploads/")
                ? imagePath.slice("/uploads/".length) // Remove "/uploads/" prefix
                : imagePath; // Use as-is if no prefix
        }

        // Delete the image file from uploads folder if it exists
        if (relativeFilePath) {
            const fullPath = path.join(__dirname, "../../uploads", relativeFilePath);
            try {
                await fs.access(fullPath); // Check if file exists
                await fs.unlink(fullPath);
                console.log(`Successfully deleted file: ${fullPath}`);
            } catch (err) {
                if (err.code === "ENOENT") {
                    console.log(`File not found at ${fullPath}, skipping deletion`);
                } else {
                    console.error(`Error deleting file at ${fullPath}:`, err);
                }
            }
        }

        // Delete the product from the database
        await Product.findByIdAndDelete(id);

        // Remove the product from all user carts
        await User.updateMany(
            {},
            { $pull: { cart: { product: id } } }
        );

        // Remove the product from all existing orders
        await Order.updateMany(
            { 'items.product': id },
            { $pull: { items: { product: id } } }
        );

        res.status(200).json({
            success: true,
            message: "Product and associated image deleted successfully",
        });
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update product Status
exports.updateProductStatus = async(req,res)=>{
    try {
        const id = req.params.id;
        const { productStatus } = req.body;

        // validate product status
        if(!productStatus || !["available", "unavailable"].includes(productStatus.toLowerCase())) {
            return res.status(400).json({ message: "Invalid product status" });
        }

        // check if product exists or not
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // update the product status
        const updatedProduct = await Product.findByIdAndUpdate(id,{
            productStatus
        },{
            new:true
        });

        res.status(200).json({
            message: "Product status updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.error("Update product status error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update product stock and price
exports.updateProductStockAndPrice = async(req,res)=>{
    try {
        const id = req.params.id;
        const { productStockQuantity, productPrice } = req.body;

        // validate input
        if(!productStockQuantity && !productPrice) {
            return res.status(400).json({ message: "Provide at least one field to update" });
        }

        // check if product exists or not
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // update the product
        const updatedProduct = await Product.findByIdAndUpdate(id,{
            productStockQuantity: productStockQuantity ? productStockQuantity : product.productStockQuantity, 
            productPrice: productPrice ? productPrice : product.productPrice
        },{
            new:true
        });

        res.status(200).json({
            message: "Product stock and price updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.error("Update product stock and price error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get orders of a product
exports.getOrdersOfProduct = async(req,res)=>{
    try {
        const {id: productId} = req.params;
        
        const product = await Product.findById(productId);
        if(!product){
            return res.status(400).json({
                message:"No product found!"
            });
        }

        const orders = await Order.find({"items.product": productId});

        res.status(200).json({
            message:"Orders of product fetched successfully",
            data: orders
        });
    } catch (error) {
        console.error("Get orders of product error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};