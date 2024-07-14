const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');


dotenv.config();
connectDB();

const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/users', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
