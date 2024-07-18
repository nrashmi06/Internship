const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRouter = require('./routes/profileRoutes');
const path = require('path');


dotenv.config();
connectDB();

const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/users', userRoutes);
app.use('/api/users', authRoutes);
app.use('/api/users', profileRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
