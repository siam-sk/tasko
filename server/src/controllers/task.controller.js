import Task from '../models/task.model.js';

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, deadline } = req.body;
    const task = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      user: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      // Check if the task belongs to the user
      if (task.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this task');
      }

      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.status = req.body.status || task.status;
      task.priority = req.body.priority || task.priority;
      task.deadline = req.body.deadline || task.deadline;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
       // Check if the task belongs to the user
       if (task.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to delete this task');
      }
      
      await Task.deleteOne({ _id: req.params.id });
      res.json({ message: 'Task removed' });
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  } catch (error) {
    next(error);
  }
};

export const getStatusOptions = (req, res) => {
  // Get enum values from the schema
  const statusEnum = Task.schema.path('status').enumValues;
  res.json(statusEnum);
};

export const getCategoryOptions = (req, res) => {
  const categories = [
    "Arts & Craft",
    "Nature",
    "Family",
    "Sport",
    "Friends",
    "Meditation"
  ];
  res.json(categories);
};

export { getTasks, createTask, updateTask, deleteTask };