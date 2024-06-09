import type { Request, Response, NextFunction } from 'express';
import { TaskModel } from 'src/model/taskModel';

// controller means it interacts with model and does CRUD
type TaskController = {
  getTask: (req: Request, res: Response, next: NextFunction) => void;
  listAllTasks: (req: Request, res: Response, next: NextFunction) => void;
  createTask: (req: Request, res: Response, next: NextFunction) => void;
  deleteTask: (req: Request, res: Response, next: NextFunction) => void;
  updateTask: (req: Request, res: Response, next: NextFunction) => void;
  deleteAllTasks: (req: Request, res: Response, next: NextFunction) => void;
};

const taskController: TaskController = {
  getTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const task = await TaskModel.getATask(taskId);
      if (!task) {
        // didn't find
        return next({
          log: `TaskController.getTask Errored: Task not found`,
          status: 404,
          message: { err: 'Task not found' },
        });
      }

      res.locals.task = task;
      return next();
    } catch (error) {
      return next();
    }
  },
  listAllTasks: async (req, res, next) => {
    try {
      const tasks = await TaskModel.getTasks();
      res.locals.tasks = tasks;
      return next();
    } catch (error) {
      return next();
    }
  },
  createTask: async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data);
      await TaskModel.createTask(data);
      res.locals.task = data;
      return next();
    }
    catch (error) {
      return next();
    }
  },
  deleteTask: async (req, res, next) => {
    try {
      const taskId = req.params.taskId;
      await TaskModel.deleteTask(taskId);
      return next();
    }
    catch (error) {
      return next();
    }
  },
  updateTask: async (req, res, next) => {
    try {
      const taskId = req.params.taskId;
      const description = req.body;
      await TaskModel.updateTask(taskId, description);
      return next();
    }
    catch (error) {
      return next();
    }
  },
  deleteAllTasks: async (req, res, next) => {
    try {
      await TaskModel.deleteAllTasks();
      return next();
    }
    catch (error) {
      return next();
    }
  }
};

export default taskController;

// OOP
