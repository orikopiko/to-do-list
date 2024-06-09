// specific router for /task route
import { Router } from 'express';
import taskController from '../controller/taskController';

const taskRouter = Router();

// build CRUD Routes
// list all tasks
taskRouter.get('/all', taskController.listAllTasks, (req, res) =>
  res.status(200).json(res.locals.tasks)
);
// get A specific task
taskRouter.get('/:taskId', taskController.getTask, (_, res) =>
  res.status(200).json(res.locals.task)
);
// delete all tasks
taskRouter.delete('/delete/all', taskController.deleteAllTasks, (req, res) => res.status(200).json("Deleted all tasks successfully."));
// delete a task
taskRouter.delete('/delete/:taskId', taskController.deleteTask, (req, res) => res.status(200).json("Deleted task successfully."));
// create a task
taskRouter.post('/new', taskController.createTask, (req, res) => res.status(200).json(` "${res.locals.task.description}" task created successfully.`))
// update a task
taskRouter.post('/update/:taskId', taskController.updateTask, (req, res) => res.status(200).json(`Task updated successfully.`))
export default taskRouter;
