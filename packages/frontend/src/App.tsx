// import { useState, useCallback } from 'react';

import { useEffect, useState } from 'react';
import { TaskCreator } from './TaskCreator';
import { TaskList } from './TaskList';
import { CompletedTasksToggle } from './CompletedTasksToggle';

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
  id: string,
  description: string;
  isCompleted: boolean;
};

// type Props = {
//   task: Task;
// };

// const TASKS: Task[] = [
//   { description: 'write to-do list', isCompleted: false },
//   { description: "watch eden's tiktoks", isCompleted: false },
//   { description: 'go to gym', isCompleted: false },
// ];

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskType, setTaskType] = useState<boolean>(false);
  const [tasksToShow, setTasksToShow] = useState<Task[]>(tasks);
  console.log('Inside App');

  useEffect(() => {
    // fetch call to firebase
    // TASKS.forEach((task) => setTasks([...tasks, task]));
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8000/task/all');
        const data = await response.json();
        setTasks(data);
        setTasksToShow(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();

    // fetch('http://localhost:8000/task/all')
    //   .then((res) => res.json())
    //   .then((data) => setTasks(data));
    // setTasksToShow(tasks);
  }, []);

  console.log('App => tasks:', tasks);

  return (
    <div className='app-container'>
      <h1>To Do List</h1>
      <TaskCreator currentListOfTasks={tasks} setTasks={setTasks} />
      <div><TaskList currentListOfTasks={tasks} setTasks={setTasks} taskType={taskType} tasksToShow={tasksToShow} setTasksToShow={setTasksToShow} /></div>
      <div><CompletedTasksToggle taskType={taskType} setTaskType={setTaskType} /></div>
    </div>
  );
};

export default App;
