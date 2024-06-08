// describe what task looks like in database, task document
// src/taskModel.ts
import { db } from '../firebase';
import {
  collection,
  getDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
} from 'firebase/firestore';

interface Task {
  id: string;
  description: string;
  isComplete: boolean;
}
// OOP as a class
const tasksCollection = collection(db, 'tasks');

// Create a new task
const createTask = async (task: Task): Promise<void> => {
  await addDoc(tasksCollection, task);
};

const getATask = async (taskId: string) => {
  const docRef = doc(db, 'tasks', taskId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: taskId, ...docSnap.data() } as Task;
  } else {
    console.error('No such document!');
    return null;
  }
};

// Get all tasks
const getTasks = async (): Promise<Task[]> => {
  const taskSnapshot = await getDocs(tasksCollection);
  const taskList = taskSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Task[];
  return taskList;
};

// Update a task
const updateTask = async (
  taskId: string,
  updatedTask: Partial<Task>
): Promise<void> => {
  const taskDoc = doc(db, 'tasks', taskId);
  await updateDoc(taskDoc, updatedTask as DocumentData);
};

// Delete a task
const deleteTask = async (taskId: string): Promise<void> => {
  const taskDoc = doc(db, 'tasks', taskId);
  await deleteDoc(taskDoc);
};

export const TaskModel = {
  getATask,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
export type { Task };
