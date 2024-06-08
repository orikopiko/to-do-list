import React, { useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Task } from './App';

type Props = {
  currentListOfTasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const TaskCreator = React.memo(
  ({ currentListOfTasks, setTasks }: Props) => {
    const [taskDescription, setTaskDescription] = useState('');

    const onInputChange = useCallback((e: any) => {
      const description: string = e.target.value;
      setTaskDescription(description);
    }, []);

    const createTask = useCallback(
      (description: string) => {
        // make post request, get task, and populate with fields you got from backend

        const task: Task = {
          id: currentListOfTasks.length,
          description,
          isCompleted: false,
        };

        setTasks([...currentListOfTasks, task]);
        setTaskDescription('');
      },
      [currentListOfTasks]
    );

    const handleButtonClick = useCallback(() => {
      createTask(taskDescription);
    }, [taskDescription, createTask]);

    return (
      <div>
        <input
          onChange={onInputChange}
          type='text'
          value={taskDescription}
          placeholder='Add a task...'
        />
        <button onClick={handleButtonClick}>click me</button>
      </div>
    );
  }
);
