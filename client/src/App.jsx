import React from "react";
import TaskManager from "./pages/TaskManager";
  import { ToastContainer, toast } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <TaskManager />
      <ToastContainer
        autoClose={3000}
        position="top-right"
        hideProgressBar={false}
      />
    </div>
  );
};

export default App;
