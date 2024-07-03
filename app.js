import express from "express";
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';


dotenv.config();
const app = express();

app.use("/uploads", express.static("uploads"));

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());


// Routes
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);


app.get('/', (req, res) => {
    res.send({ message: "welcome to ecommerace app" });
});


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message
    });
});

export default app;
