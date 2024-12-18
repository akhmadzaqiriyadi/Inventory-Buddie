const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const categoryRoutes = require('./routes/category.routes');
const rackRoutes = require('./routes/rack.routes');
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const transactionRoutes = require('./routes/transaction.routes');
const reportRoutes = require('./routes/report.routes');
const userRoutes = require('./routes/user.routes');
const statisticsRoutes = require('./routes/statistics.routes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:3001', // URL frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
    credentials: true, // Untuk mengizinkan cookie jika digunakan
  })
);

// Parsing JSON dan URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Inventory App!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/racks', rackRoutes);
app.use('/api/products', productRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/reports', reportRoutes);
app.use('/api', userRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
