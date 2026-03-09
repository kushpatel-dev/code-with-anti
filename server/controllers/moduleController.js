const Module = require('../models/Module');

exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find({});
    // Map `moduleId` back to `id` for frontend compatibility
    const mappedModules = modules.map(m => {
      const obj = m.toObject();
      obj.id = obj.moduleId;
      return obj;
    });
    res.json(mappedModules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createModule = async (req, res) => {
  try {
    const newModule = new Module(req.body);
    await newModule.save();
    res.status(201).json(newModule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
