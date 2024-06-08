import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import taskRouter from './router/taskRouter';
import path from 'path';
import cors from 'cors';

// main file, intializes server connection, also any type of config
// also has all the routers

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// serve static files
app.use(express.static(path.resolve('../frontend/dist/assets')));

// routers
app.use('/task', taskRouter);

// get for html
app.get('*', (req, res): void => {
  res.status(200).sendFile(path.resolve('../frontend/dist/index.html'));
});

// catch all 404
app.use('*', (req, res) => {
  return res.status(404).send('The page you are looking for does not exist.');
});

// global error object
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const defaultErr = {
    log: `GLOBAL ERROR HANDLER: caught unknown middleware error${err.toString()}`,
    status: 500,
    message: { err: 'An unknown error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  if (errorObj.log) console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(8000, () => {
  console.log('Our express server is up on port 8000');
});
