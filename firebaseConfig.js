// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDZnpGij3OytOYwqQ5g_eQp8oveUFh3O5M",
  authDomain: "conectando-educacao-pe.firebaseapp.com",
  databaseURL: "https://conectando-educacao-pe-default-rtdb.firebaseio.com",
  projectId: "conectando-educacao-pe",
  storageBucket: "conectando-educacao-pe.firebasestorage.app",
  messagingSenderId: "1070197269103",
  appId: "1:1070197269103:web:559640e7931e1934e6239a",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
