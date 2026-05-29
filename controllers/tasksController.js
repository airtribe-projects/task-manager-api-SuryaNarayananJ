const tasksData = require("../models/tasks");
let tasks = tasksData.tasks;
const fs = require('fs');

//Implement GET /tasks: Retrieve all tasks.
//Implement filtering by completion status for GET /tasks (e.g., GET /tasks?completed=true).
const getAllTasks = (req,res)=>{
    let tasksResult = [...tasks];
    if(tasksResult.length === 0){ return res.status(404).send("No tasks found");};

    let sort = req.query.sort;
    let priority = req.query.priority;
    let completed = req.query.completed;

    if(sort === "asc") tasksResult.sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt));
    if(sort === "desc") tasksResult.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt));

    if(completed === undefined && priority === undefined){return res.json(tasksResult);}

    let filteredTasks = tasksResult;
    if(priority !== undefined){
        filteredTasks = filteredTasks.filter((task)=>{return task.priority === priority});
    }

    if(completed !== undefined){
        const completedBoolean = completed === "true";
        filteredTasks = filteredTasks.filter((task)=>{return task.completed === completedBoolean});
    }
    
    return res.json(filteredTasks);
}

// Implement GET /tasks/:id: Retrieve a specific task by its ID.
const getTaskById = (req,res)=>{

    let taskById = req.task.taskById;

    res.json(taskById);
}

// Implement POST /tasks: Create a new task with the required fields (title, description, completed).
const createTask = (req,res)=>{

    let newId = 1;

    if(tasks.length > 0){
        newId = parseInt(tasks[tasks.length-1].id) + 1;
    }

    let newTask = {
        "id":newId,
        "title":req.body.title,
        "description":req.body.description,
        "completed":req.body.completed,
        "priority":req.body.priority,
        "createdAt":new Date().toISOString()
    };

    tasks.push(newTask);

    try{
        fs.writeFileSync(
            "./models/tasks.json",
            JSON.stringify(tasksData, null, 2)
        );
        tasks = tasksData.tasks
    }catch(error){
        console.error("Error writing to file:", error);
        return res.status(500).json({ error: "Failed to save task" });
    }

    res.status(201).json(newTask);
}

// Implement PUT /tasks/:id: Update an existing task by its ID.
const updateTask = (req,res)=>{

    let taskById = req.task.taskById;
    
    taskById.title = req.body.title;
    taskById.description = req.body.description;
    taskById.completed = req.body.completed;
    taskById.priority = req.body.priority;

    try{
        fs.writeFileSync(
            "./models/tasks.json",
            JSON.stringify(tasksData, null, 2)
        );
        tasks = tasksData.tasks
    }catch(error){
        console.error("Error writing to file:", error);
        return res.status(500).json({ error: "Failed to update task" });
    }
    res.json(taskById);
}

// Implement DELETE /tasks/:id: Delete a task by its ID.
const deleteTask = (req,res)=>{

    let taskId = req.task.taskId;
    let taskById = req.task.taskById;
    let index = tasks.findIndex((task) =>task.id == taskId);

    tasks.splice(index,1);

    try{
        fs.writeFileSync(
            "./models/tasks.json",
            JSON.stringify(tasksData, null, 2)
        );
        tasks = tasksData.tasks
    }catch(error){
        console.error("Error writing to file:", error);
        return res.status(500).json({ error: "Failed to delete task" });
    }

    res.json(taskById);
};

module.exports = {getAllTasks,getTaskById,createTask,updateTask,deleteTask};