const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
      title : String,
      userID : String
})

module.exports = mongoose.model("Task",taskSchema)