// task[] -> map into Task components
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import type { Task as TaskType } from './App';
import { Task } from './Task';
import { CompletedTasksToggle } from './CompletedTasksToggle';
type Props = {
    currentListOfTasks: TaskType[];
    setTasks: Dispatch<SetStateAction<TaskType[]>>;
    taskType: boolean;
    tasksToShow: TaskType[];
    setTasksToShow: Dispatch<SetStateAction<TaskType[]>>;
};
export const TaskList = ({ currentListOfTasks, setTasks, taskType, tasksToShow, setTasksToShow }: Props) => {
    const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);
    // let uncompletedTasks: TaskType[] = [];
    // useEffect(() => {
    //     console.log('Inside Task List');
    //     const allCompletedTasks = currentListOfTasks.filter(task => task.isCompleted);
    //     console.log('Completed Tasks inside task list: ', allCompletedTasks);
    //     setCompletedTasks(allCompletedTasks);
    //     // uncompletedTasks = currentListOfTasks.filter(task => !task.isCompleted);
    // }, [currentListOfTasks]);
    // const uncompletedTasks = useMemo(() => {
    //     return currentListOfTasks.filter(task => !task.isCompleted)
    // }, [currentListOfTasks]);
    // console.log('Uncompleted tasks:', uncompletedTasks);
    // useEffect(() => {
    //     setTasksToShow(taskType ? completedTasks : uncompletedTasks)
    // }, [taskType, completedTasks, uncompletedTasks]);
    useEffect(() => {
        const updateTasksToShow = () => {
            const allCompletedTasks = currentListOfTasks.filter(task => task.isCompleted);
            const allUncompletedTasks = currentListOfTasks.filter(task => !task.isCompleted);
            setTasksToShow(taskType ? allCompletedTasks : allUncompletedTasks);
        };

        updateTasksToShow();
    }, [currentListOfTasks, taskType]);
    console.log('task type:', taskType);
    console.log('tasksToShow:', tasksToShow);
    const taskRows: JSX.Element[] = tasksToShow.map(currentTask => (
        <div className="task-row" key={currentTask.id}>
            <Task
                task={currentTask}
                currentListOfTasks={currentListOfTasks}
                setTasks={setTasks}
                completedTasks={completedTasks}
                setCompletedTasks={setCompletedTasks}
            />
        </div>

    ));


    return (
        <div>
            {taskRows}
            {/* <table>
                <tbody>{taskRows}</tbody>
            </table> */}
            {/* <div><CompletedTasksToggle taskType={taskType} setTaskType={setTaskType} /></div> */}
        </div>
    );
};