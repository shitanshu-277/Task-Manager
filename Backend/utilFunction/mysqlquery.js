const getUser="SELECT * FROM users WHERE username=?"
const getPassword="SELECT * FROM users WHERE username=? && password=?"
const createUser="INSERT INTO users(username,password) VALUES(?,?)"
const updatePassword="UPDATE users SET password=? WHERE username=?"
const getTasks="SELECT * FROM tasks WHERE username=? and completedDate is NULL ORDER BY createDate DESC"
const createTask="INSERT INTO tasks(task_ID,username,title,description) VALUES (?,?,?,?)"
const taskCompleted="UPDATE tasks SET completedDate=? WHERE task_id=? "
const deleteTask="DELETE FROM tasks WHERE task_id=?"
const getCompletedTasks="SELECT * FROM tasks WHERE username=? and completedDate is not NULL ORDER BY completedDate DESC"
const editTask="UPDATE tasks SET title=?,description=? WHERE task_id=? "
const dueTask="UPDATE tasks SET completedDate=NULL WHERE task_id=?"

module.exports={
    getUser,
    getPassword,
    createUser,
    updatePassword,
    getTasks,
    createTask,
    taskCompleted,
    deleteTask,
    getCompletedTasks,
    editTask,
    dueTask
}