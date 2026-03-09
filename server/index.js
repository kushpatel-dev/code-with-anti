require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const moduleRoutes = require('./routes/moduleRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://kush:kush%2399@cluster0.qmqksdb.mongodb.net/modules_data?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use Routes
app.use('/api/modules', moduleRoutes);
app.use('/api/quizzes', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
