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
// create a task
// update a task
// delete a task
// delete all tasks

export default taskRouter;
