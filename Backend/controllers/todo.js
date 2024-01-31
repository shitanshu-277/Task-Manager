const mysqlQueries =require('../utilFunction/mysqlquery.js');
const { redisClient } = require('../redis_connection.js');
const { v4: uuidv4 } = require('uuid');
const {checkSessionExists}=require('../utilFunction/functions.js');


const Alltodos=async(req,res)=>{
    const sessionID = req.cookies.sessionID;
    if (!checkSessionExists(sessionID)) { res.status(401).send({msg:"You are not authorised to display all toDO"}) }
    else {
        const userName = await redisClient.get(`sess:${sessionID}`);
        con.query(mysqlQueries.getTasks, userName, function (err, result) {
            try{
            if (err) throw err
            if (result.length > 0) {
                let tasks = [];
                for (let value of result) {
                    tasks.push(
                        {
                            "taskID": value.task_ID,
                            "title": value.title,
                            "description": value.description
                        }
                    )
                }

                res.status(200).send(tasks);
            }
            else {
                res.status(404).send({msg:'No todo is there'});
            }
        }
        catch(error){
            console.log('Error is', error);
                res.status(400).send({msg:"Error While displaying ToDO"})
        }
        })
    }
}

const createTodo=async(req,res)=>{
    const sessionID = req.cookies.sessionID;
    if (!checkSessionExists(sessionID)) {res.status(401).send({msg:"You are not authorised to create ToDO"})}
    else {
        const userName = await redisClient.get(`sess:${sessionID}`);
        const Title = req.body.title;
        const Description = req.body.description;
        const uniqueID = uuidv4();
        con.query(mysqlQueries.createTask, [uniqueID, userName, Title, Description], function (err, result) {
            try {
                if (err) {
                    console.log(err)
                }
                else {
                    res.status(200).send({msg:'Todo created successfully'});
                }
            }
            catch (error) {
                console.log('Error is', error);
                res.status(400).send({msg:"Error While creating ToDO"})
            }
        })
    }
}

const markTodoDone=async(req,res)=>{
    const uniqueID = req.params.id;
    const sessionID = req.cookies.sessionID 
    if (!checkSessionExists(sessionID)) res.status(401).send({msg:"You are not authorised to mark toDO as done"})
    else {
        const dateTime=new Date();
        con.query(mysqlQueries.taskCompleted,[dateTime,uniqueID], function (err, result) {
            try {
                if (err) {
                    console.log(err);
                    res.status(400).send({msg:"Error in MySQL Query"})
                }
                else {
                    res.status(200).send({msg:'Todo Completed'});
                }
            }
            catch (err) {
                console.log('Error is', err);
                res.status(400).send({msg:"Error while marking toDO  done"})
            }
        })
    }
}

const editTodo=async(req,res)=>{
    const uniqueID = req.params.id;
    const sessionID = req.cookies.sessionID;
    const Title=req.body.title;
    const Description = req.body.description;
    if (!checkSessionExists(sessionID)) res.status(401).send({msg:"You are not authorised to edit toDO"})
    else {
        con.query(mysqlQueries.editTask, [Title,Description, uniqueID], function (err, result) {
            try {
                if (err) {
                    console.log(err);
                    res.status(400).send({msg:"Error in MySQL Query"})
                }
                else {
                    res.status(200).send({msg:'Todo edited'});
                }
            }
            catch (err) {
                console.log('Error is', err);
                res.status(400).send({msg:"Error while editing toDO"})
            }
        })
    }
}

const getCompletedTodos=async(req,res)=>{
    const sessionID = req.cookies.sessionID;
    if (!checkSessionExists(sessionID)) res.status(401).send({msg:"You are not authorised to see completed toDO"})
    else {
        const userName = await redisClient.get(`sess:${sessionID}`);
        con.query(mysqlQueries.getCompletedTasks, userName, function (err, result) {
            try{
            if (err) throw err;
            if(result.length>0){
            let completedTasks = [];
            for (let value of result) {
                completedTasks.push(
                    {
                        "taskID": value.task_ID,
                        "title": value.title,
                        "description": value.description
                    }
                )
            }
            res.status(200).send(completedTasks);
            }
            else res.status(400).send({msg:'You have not completed any toDO'});
            }
            catch(error){
                console.log('Error is', error);
                res.status(400).send({msg:"Error while displaying completed toDO"})
            }
        })
    }
}

const deleteTodo=async(req,res)=>{
    const uniqueID = req.params.id;
    const sessionID = req.cookies.sessionID;
    if (!checkSessionExists(sessionID)) res.status(401).send({msg:"You are not authorised to delete this toDO"})
    else {
        con.query(mysqlQueries.deleteTask, uniqueID, function (err, result) {
            try {
                if (err) {
                    console.log(err);
                    res.status(400).send({msg:"Error in MySQL Query"})
                }
                else {
                    res.status(200).send({msg:'Todo deleted successfully'});
                }
            }
            catch (error) {
                console.log('Error is', error);
                res.status(400).send({msg:"Error in deleting toDO"})
            }
        })
    }
}

const dueTodo=async(req,res)=>{
    const uniqueID = req.params.id;
    const sessionID = req.cookies.sessionID;
    if (!checkSessionExists(sessionID)) res.status(401).send({msg:"You are not authorised to delete this toDO"})
    else {
        con.query(mysqlQueries.dueTask, uniqueID, function (err, result) {
            try {
                if (err) {
                    console.log(err);
                    res.status(400).send({msg:"Error in MySQL Query"})
                }
                else {
                    res.status(200).send({msg:'Todo marked as uncompleted'});
                }
            }
            catch (error) {
                console.log('Error is', error);
                res.status(400).send({msg:"Error in deleting toDO"})
            }
        })
    }
}

module.exports={
    Alltodos,
    createTodo,
    markTodoDone,
    getCompletedTodos,
    deleteTodo,
    editTodo,
    dueTodo
}