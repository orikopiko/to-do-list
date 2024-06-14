import React, { useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Task as TaskType } from './App';
type Props = {
    taskType: boolean;
    setTaskType: Dispatch<SetStateAction<boolean>>;

};

export const CompletedTasksToggle = (({ taskType, setTaskType }: Props) => {
    const handleCheckboxChange = ((e: any) => {
        setTaskType(prev => !prev);
    });
    return (
        <div className='toggle-container'>
            <label>
                <input type='checkbox' onChange={handleCheckboxChange} />
                {taskType ? "Show uncompleted tasks." : "Show completed tasks."}
            </label>
        </div>
    )
});
