import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'E-Com_Category',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

productSchema.index({ name: 1 });

const Product = mongoose.model('Product', productSchema);
export default Product;
