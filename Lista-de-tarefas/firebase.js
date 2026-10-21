import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBiYftQcNRN_Ix9emLxgQFu5nDcTJdtGlM",
  authDomain: "lista-de-tarefas-20-10-26.firebaseapp.com",
  databaseURL: "https://lista-de-tarefas-20-10-26-default-rtdb.firebaseio.com/",
  projectId: "lista-de-tarefas-20-10-26",
  appId: "1:597882523366:web:d6def99ce381693cccb527"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };