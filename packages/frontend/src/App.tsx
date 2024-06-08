// import { useState, useCallback } from 'react';

import { useEffect, useState } from 'react';
import { TaskCreator } from './TaskCreator';

// type Task = {
//   id: number;
//   description: string;
//   isCompleted: boolean;
// };

// type Props = {
//   task: Task;
// };

// function CreateTask() {
//   const [taskDescription, setTaskDescription] = useState('');
//   const handleAddTask = useCallback((task: Task) => {
//     console.log('Added Task!');
//   }, []);

//   return (
//     <div>
//       <input type='text' placeholder='Add a task...' />
//       <button onClick={handleAddTask}>Add Task!</button>
//     </div>
//   );
// }

// // props =  {task: {id, desc, iscompleted}, id, color}
// // {task, id, color} = props

// function TaskRow({ task }: Props) {
//   const handleCheckboxChange = (e: any) => {
//     console.log('Checked!');
//   };
//   const handleDelete = (e: any) => {
//     console.log('Deleted!');
//   };
//   return (
//     <div className='task-row'>
//       <label>
//         <input type='checkbox' onChange={handleCheckboxChange} />
//       </label>
//       <span className='task-description'>{task.description}</span>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// }

// type TaskTableProps = {
//   tasks: Array<Task>;
// };

// function TaskTable({ tasks }: TaskTableProps) {
//   return (
//     <div>
//       {tasks.map(
//         (task) => !task.isCompleted && <TaskRow key={task.id} task={task} />
//       )}
//     </div>
//   );
// }

// function FilterRow({ tasks }: TaskTableProps) {
//   const handleCheckboxChange = (e: any) => {
//     console.log('Completed tasks checkbox clicked!');
//   };
//   return (
//     <div>
//       <label>
//         <input type='checkbox' onChange={handleCheckboxChange} />
//         View completed tasks
//       </label>
//     </div>
//   );
// }
// function ToDoListTable({ tasks }: TaskTableProps) {
//   const uncompletedTasks = tasks.filter((task) => {
//     return !task.isCompleted;
//   });

//   const completedTasks = tasks.filter((task) => {
//     return task.isCompleted;
//   });

//   const [tasksList, setTaskList] = useState(uncompletedTasks);
//   const [completedTasksOnly, setCompletedTasksOnly] = useState(completedTasks);
//   return (
//     <div>
//       <h1>To-Do List!</h1>
//       <CreateTask />
//       <TaskTable tasks={tasks} />
//       <FilterRow tasks={tasks} />
//     </div>
//   );
// }

// const TASKS = [
//   { id: 1, description: 'write to-do list', isCompleted: false },
//   { id: 2, description: "watch eden's tiktoks", isCompleted: false },
//   { id: 3, description: 'go to gym', isCompleted: false },
// ];

// export default function App() {
//   return (
//     <div className='app-container'>
//       <ToDoListTable tasks={TASKS} />
//     </div>
//   );
// }

export type Task = {
  id: number;
  description: string;
  isCompleted: boolean;
};

// type Props = {
//   task: Task;
// };

const TASKS: Task[] = [
  { id: 1, description: 'write to-do list', isCompleted: false },
  { id: 2, description: "watch eden's tiktoks", isCompleted: false },
  { id: 3, description: 'go to gym', isCompleted: false },
];

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  console.log('App => tasks:', tasks);

  useEffect(() => {
    // fetch call to firebase
    TASKS.forEach((task) => setTasks([...tasks, task]));
  }, []);

  return (
    <div>
      <h1>To Do List</h1>
      <TaskCreator currentListOfTasks={tasks} setTasks={setTasks} />
      <div>{/**Task list */}</div>
    </div>
  );
};

export default App;
