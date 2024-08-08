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

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/users', userRoutes);
app.use('/api/users', authRoutes);
app.use('/api/users', profileRouter);
app.use('/api/users', commentRoutes);
app.use('/api/auth', refreshRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
