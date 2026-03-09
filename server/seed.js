require('dotenv').config();
const mongoose = require('mongoose');
const Module = require('./models/Module');
const Quiz = require('./models/Quiz');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://kush:kush%2399@cluster0.qmqksdb.mongodb.net/modules_data?retryWrites=true&w=majority';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Using dynamic import to handle ES modules from the React app
    const { LEARNING_MODULES } = await import('../src/data/modules.js');
    const { QUIZ_DATA } = await import('../src/data/quizData.js');

    // Clear existing data
    await Module.deleteMany({});
    await Quiz.deleteMany({});
    console.log('Existing data cleared.');

    // Prepare modules for insertion
    const modulesToInsert = LEARNING_MODULES.map(mod => ({
      moduleId: mod.id,
      title: mod.title,
      level: mod.level,
      duration: mod.duration,
      icon: mod.icon,
      color: mod.color,
      lessons: mod.lessons
    }));

    await Module.insertMany(modulesToInsert);
    console.log('Modules seeded successfully.');

    // Prepare quizzes for insertion
    const quizzesToInsert = Object.keys(QUIZ_DATA).map(quizTitle => ({
      quizTitle,
      questions: QUIZ_DATA[quizTitle]
    }));

    await Quiz.insertMany(quizzesToInsert);
    console.log('Quizzes seeded successfully.');

    mongoose.disconnect();
    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
    // Disconnect if there's an error to exit the process
    if (mongoose.connection.readyState === 1) {
      mongoose.disconnect();
    }
    process.exit(1);
  }
};

seedDatabase();
