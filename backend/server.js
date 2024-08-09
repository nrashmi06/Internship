const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRouter = require('./routes/profileRoutes');
const commentRoutes = require('./routes/commentRoutes');
const refreshRoutes = require('./routes/refreshRoutes');
const path = require('path');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'https://internship-4d4f.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/users', userRoutes);
app.use('/api/users', authRoutes);
app.use('/api/users', profileRouter);
app.use('/api/users', commentRoutes);
app.use('/api/auth', refreshRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
