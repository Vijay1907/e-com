import mongoose from 'mongoose';
import Product from './productModel.js';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const Category = mongoose.model('E-Com_Category', categorySchema);
export default Category;
