const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
      title : String,
      userId : String
})

module.exports = mongoose.model("Task",taskSchema)