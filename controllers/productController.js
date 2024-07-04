import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
    try {
        const { name, price, category, description, image,size,color } = req.body;
        const product = new Product({ name, price, category, description, image,size,color });
        await product.save();
        res.status(201).json({ success: true,product });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json({success: true,products});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({success: false, message: 'Product not found' });
        }
        res.status(200).json({success: true,product});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!product) {
            return res.status(404).json({success: false, message: 'Product not found' });
        }
        res.status(200).json({success: true,product});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({success: false, message: 'Product not found' });
        }
        res.status(200).json({success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchProducts = async (req, res) => {
    try {
        const { name } = req.query;

       
        const result = await Product.aggregate([
            { $match: { name: { $regex: name, $options: 'i' } } },
            {
                $lookup: {
                    from: 'e-com_categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryInfo'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    description: 1,
                    image: 1,
                    color: 1,
                    size: 1,
                    category: { $arrayElemAt: ['$categoryInfo.name', 0] }
                }
            },
            {
                $group: {
                    _id: null,
                    products: { $push: '$$ROOT' },
                    categories: { $addToSet: '$category' },
                    colors: { $addToSet: '$color' },
                    sizes: { $addToSet: '$size' }
                }
            },
            {
                $project: {
                    _id: 0,
                    products: 1,
                    categories: 1,
                    colors: 1,
                    sizes: 1
                }
            }
        ]);

        const { products, categories, colors, sizes } = result[0];

        res.status(200).json({
            success: true,
            products,
            categories,
            colors,
            sizes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
