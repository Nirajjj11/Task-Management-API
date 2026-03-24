const Task = require("../models/Task")

// Create Task 
// exports.createTask = async (req,res)=>{
//       const task = await Task.create({
//             title : req.body.title,
//             userId : req.user
//       })
//       res.json(task)
// }

exports.createTask = async (req, res) => {
      console.log("USER ID:", req.user)  // 🔍 debug

      const task = await Task.create({
            title: req.body.title,
            userId: req.user
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
//    await Task.findByIdAndDelete(req.params.id)
      await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user
      })
      res.json({msg : "Task deleted"})
}