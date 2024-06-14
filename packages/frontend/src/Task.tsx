// do this first => make a component to show task
import { Dispatch, SetStateAction, useCallback } from 'react';
import type { Task as TaskType } from './App';

type Props = {
  task: TaskType;
  currentListOfTasks: TaskType[];
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  completedTasks: TaskType[];
  setCompletedTasks: Dispatch<SetStateAction<TaskType[]>>;
};

export const Task = ({ task, currentListOfTasks, setTasks, completedTasks, setCompletedTasks }: Props) => {
  const handleCheckboxChange = (e: any) => {
    // console.log('Inside Task checkbox');
    // console.log('Completed tasks: ', completedTasks);
    // task.isCompleted = true;
    // console.log('Task:', task);
    // setCompletedTasks([...completedTasks, task]);
    // console.log('Completed tasks inside task checkbox after update:', completedTasks);
    // WHY DOES NOT DOING JUST setCompletedTasks rerender? i have to do both setTasks and setCompletedTasks
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    const updatedTasks = currentListOfTasks.map(t => t.id === task.id ? updatedTask : t);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, updatedTask]);
  };
  const deleteTask = async (task: TaskType) => {
    console.log('Task to delete: ', task.description);
    await fetch(`http://localhost:8000/task/delete/${task.id}`, {
      method: 'DELETE'
    });
    const updatedTasks = currentListOfTasks.filter((curTask) => curTask.id != task.id);
    setTasks(updatedTasks);

  };
  const handleDelete = useCallback(async () => {
    await deleteTask(task);
  }, [task, deleteTask]);
  return (
    <div className='task-item'>
      <label>
        <input type='checkbox' onChange={handleCheckboxChange} />
      </label>
      <span className='task-description'>{task.description}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
