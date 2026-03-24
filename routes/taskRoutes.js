const express = require("express")
const router = express.Router()

const {createTask, getTasks, deleteTask} = require('../controllers/taskController')

const auth = require('../middleware/authMiddleware')

router.post('/',auth,createTask);
router.get('/',auth,getTasks);
router.delete("/:id",auth,deleteTask);

module.exports = router