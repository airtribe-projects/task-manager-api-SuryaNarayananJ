const tasksData = require("../models/tasks");
let tasks = tasksData.tasks;

//check id middleware
const checkId = (req,res,next)=>{
    
    let taskId = parseInt(req.params.id);

    if(isNaN(taskId)){
        return res.status(400).send("Invalid Id");
    }

    let taskById = tasks.find((task) =>task.id === taskId);

    if(!taskById) {return res.status(404).send("Task not found");}

    req.task = {
        taskId:taskId,
        taskById:taskById
    } 
    next();
}

//check body middleware
const checkBody = (req,res,next)=>{
    
    if(!req.body || Object.keys(req.body).length === 0) {return res.status(400).send("No body found");}

    if(!req.body.title) {return res.status(400).send("title field is required and must be string");}

    if(!req.body.description) {return res.status(400).send("description field is required and must be string");}

    if(typeof req.body.completed !== "boolean") {return res.status(400).send("completed field is required and must be boolean");}

    if(!req.body.priority) {return res.status(400).send("priority field is required and must be 'low', 'medium' or 'high'");}
    
    if(req.body.priority !== "low" && req.body.priority !== "medium" && req.body.priority !== "high") {return res.status(400).send("priority field must be 'low', 'medium' or 'high'");}

    next();
}

const checkQueryParam = (req,res,next)=>{

    const sort = req.query.sort;
    const priority = req.query.priority;
    const completed = req.query.completed;
    
    if(sort !== undefined && sort !== "asc" && sort !== "desc") {return res.status(400).send("Invalid sort query value input")};

    if(priority !== undefined && priority !== "low" && priority !== "medium" && priority !== "high") {return res.status(400).send("Invalid priority query value input")};

    if(completed !== undefined && completed !== "true" && completed !== "false") {return res.status(400).send("Invalid completed query value input")}


    next();
}

module.exports = {checkId,checkBody,checkQueryParam};