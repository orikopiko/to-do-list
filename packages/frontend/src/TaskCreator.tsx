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
      async (description: string) => {
        // make post request, get task, and populate with fields you got from backend
        const data = { description, isCompleted: false };
        const response = await fetch('http://localhost:8000/task/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const newTask: Task = result.task;

        setTasks([...currentListOfTasks, newTask]);
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
        <button onClick={handleButtonClick}>Add Task!</button>
      </div>
    );
  }
);
