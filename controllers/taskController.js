const Task = require("../models/Task")

// Create Task 
exports.createTask = async (req,res)=>{
      const task = await Task.create({
            title : req.body.title,
            userId : req.user
      })
      res.json(task)
}

// GET task

exports.getTasks = async (req,res)=>{
      const task = await Task.find({
            userId : req.user
      })
      res.json(task)
}

// Delete Task

exports.deleteTask = async(req,res)=>{
      await Task.findByIdAndDelete(req.params.id)
      res.json({msg : "Task deleted"})
}