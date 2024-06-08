// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, onValue, set } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyByyJMB9FgZLZ8kKZq7b8n10VmSNVYrw4c',
  authDomain: 'to-do-list-9569b.firebaseapp.com',
  databaseURL: 'https://to-do-list-9569b-default-rtdb.firebaseio.com',
  projectId: 'to-do-list-9569b',
  storageBucket: 'to-do-list-9569b.appspot.com',
  messagingSenderId: '143527214847',
  appId: '1:143527214847:web:6e69d99b148157709e16ca',
  measurementId: 'G-16ZVS3YQRT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function writeTaskData(
  taskId: number,
  description: string,
  isComplete: boolean
) {
  const db = getDatabase();
  const reference = ref(db, 'taskslist/' + taskId);
  set(reference, {
    id: taskId,
    description: description,
    isComplete: isComplete,
  });
}
writeTaskData(1, 'write to-do list', false);
