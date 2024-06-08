// do this first => make a component to show task
import { useCallback } from 'react';
import type { Task as TaskType } from './App';

type Props = {
  task: TaskType;
};
export const Task = ({ task }: Props) => {
  const handleCheckboxChange = useCallback(
    (e: any) => {
      task.isCompleted = true;
    },
    [task]
  );
  const handleDelete = (e: any) => {};
  return (
    <div>
      <label>
        <input type='checkbox' onChange={handleCheckboxChange} />
      </label>
      <span className='task-description'>{task.description}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
