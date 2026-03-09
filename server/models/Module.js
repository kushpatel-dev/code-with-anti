const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  id: Number,
  title: String,
  type: String,
  duration: String,
  content: String
});

const ModuleSchema = new mongoose.Schema({
  moduleId: { type: String, required: true, unique: true },
  title: String,
  level: String,
  duration: String,
  icon: String,
  color: String,
  lessons: [LessonSchema]
});

module.exports = mongoose.model('Module', ModuleSchema);
