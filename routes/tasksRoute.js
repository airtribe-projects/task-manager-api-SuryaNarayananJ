const express = require("express");
const router = express.Router();
const {getAllTasks,getTaskById,createTask,updateTask,deleteTask} = require("../controllers/tasksController");
const {checkId,checkBody,checkQueryParam} = require("../middlewares/tasksMiddleware")

router.get('/',checkQueryParam,getAllTasks);
router.get('/:id',checkId,getTaskById);
router.post('/',checkBody,createTask);
router.put('/:id',checkId,checkBody,updateTask);
router.delete('/:id',checkId,deleteTask);

module.exports = router;