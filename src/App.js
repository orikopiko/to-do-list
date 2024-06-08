import { useState } from "react";


function CreateTask() {
    const handleAddTask = (e) => {
        e.preventDefault();
        console.log("Added Task!");
    }
    return (
        <form>
            <input type="text" placeholder="Add a task..." />
            <button onClick={handleAddTask}>Add Task!</button>
        </form>
    );
}

function TaskRow({ task }) {
    const handleCheckboxChange = (e) => {
        console.log('Checked!')
    }
    const handleDelete = (e) => {
        console.log('Deleted!')
    }
    return (
        <div className="task-row">
            <label>
                <input type="checkbox" onChange={handleCheckboxChange} />
            </label>
            <span className="task-description">{task.description}</span>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

function TaskTable({ tasks }) {
    return (
        <div>
            {tasks.map(task => (
                !task.isCompleted && <TaskRow key={task.id} task={task} />
            ))}
        </div>
    );
}
function FilterRow({ tasks }) {
    const handleCheckboxChange = (e) => {
        console.log("Completed tasks checkbox clicked!");
    }
    return (
        <div>
            <label>
                <input type="checkbox" onChange={handleCheckboxChange} />
                View completed tasks
            </label>
        </div>
    );
}
function ToDoListTable({ tasks }) {
    const uncompletedTasks = tasks.filter((task) => {
        return !task.isCompleted;
    });

    const completedTasks = tasks.filter((task) => {
        return task.isCompleted;
    });

    const [tasksList, setTaskList] = useState(uncompletedTasks);
    const [completedTasksOnly, setCompletedTasksOnly] = useState(completedTasks);
    return (
        <div>
            <h1>To-Do List!</h1>
            <CreateTask />
            <TaskTable tasks={tasks} />
            <FilterRow tasks={tasks} />
        </div>
    );
}

const TASKS = [
    { id: 1, description: "write to-do list", isCompleted: false },
    { id: 2, description: "watch eden's tiktoks", isCompleted: false },
    { id: 3, description: "go to gym", isCompleted: false }
];

export default function App() {
    return (
        <div className="app-container">
            <ToDoListTable tasks={TASKS} />
        </div>
    );
}