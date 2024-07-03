import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json({success: true,category});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({success: true,categories});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({success: false, message: 'Category not found' });
        }
        res.status(200).json({success: true,category});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({success: false, message: 'Category not found' });
        }
        res.status(200).json({success: true,category});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({success: false, message: 'Category not found' });
        }
        await Product.deleteMany({ category: req.params.id});
        res.status(200).json({ success:true,message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
