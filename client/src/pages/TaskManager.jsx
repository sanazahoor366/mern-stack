import React from "react";
import { FaCheck, FaDeleteLeft, FaPlus, FaTrash } from "react-icons/fa6";
import { FaPencilAlt, FaSearch } from "react-icons/fa";
import { useState } from "react";
import {
  createTask,
  deleteTask,
  getTask,
  updateTaskById,
} from "../utils/utils";
import { notify } from "../toastLogic/toastLogic";
import { useEffect } from "react";

const TaskManager = () => {
  const [input, setinput] = useState("");
  const [task, settask] = useState([]);
  const [copyTask, setcopyTask] = useState([]);
  const [updateTask, setupdateTask] = useState(null);

  const handleTask = async () => {
    //   if(updateTask && input ){
    //     console.log('update api call');
    //     const obj =  {
    //       taskname: input,
    //       isdone: updateTask.isdone,
    //       _id: updateTask._id
    //     }
    //   await handleUpdateItem(obj)
    // //update task
    // setinput('')
    //   } else if(updateTask === null && input ) {
    // //create api call
    // await handleAddTask()
    // setinput('')
    //   }

    if (updateTask) {
      //update api call
      const obj = {
        taskname: input,
        isdone: updateTask.isdone,
        _id: updateTask._id,
      };
      await handleUpdateItem(obj);
      setupdateTask(null)
    } else {
      await handleAddTask()
    }
    

    setinput('')
  }

  useEffect(() => {
    if (updateTask) {
      setinput(updateTask.taskname);
    }
  }, [updateTask]);

  const handleAddTask = async () => {
    const obj = {
      taskname: input,
      isdone: false,
    };
    // console.log(obj);
    try {
      const { message, success } = await createTask(obj);
      if (success) {
        notify(message, "success");

        handlerForGetAllData();
        return;
      }
      notify(message, "error");
      //   console.log(data);
    } catch (error) {
      notify("failed to create task", "error");
    }
  };
  // console.log(input);
  const handlerForGetAllData = async () => {
    const { data } = await getTask();
    // console.log(data);

    setcopyTask(data);
    settask(data);
  };
  useEffect(() => {
    handlerForGetAllData();
  }, []);
  const handleDeleteButton = async (id) => {
    try {
      const { message, success } = await deleteTask(id);
      if (success) {
        notify(message, "success");
        return handlerForGetAllData();
      }
      notify(message, "error");
    } catch (error) {
      notify("error from server side", "error");
    }
  };

  const handleCheckAndUncheck = async (item) => {
    const { _id, isdone, taskname } = item;
    try {
      const obj = {
        taskname,
        isdone: !isdone,
      };
      const { message, success } = await updateTaskById(_id, obj);
      if (success) {
        notify(message, "success");
        handlerForGetAllData();
        return;
      }
      notify(message, "error");
    } catch (error) {
      console.error(error);
      notify("failed to create data");
    }
  };

  const handleUpdateItem = async (item) => {
    const { _id, isdone, taskname } = item;
    try {
      const obj = {
        taskname,
        isdone: !isdone,
      };
      const { message, success } = await updateTaskById(_id, obj);
      if (success) {
        notify(message, "success");
        handlerForGetAllData();
        return;
      }
      notify(message, "error");
    } catch (error) {
      console.error(error);
      notify("failed to create data");
    }
  };
  const handleSearch = (e) => {
  const term = e.target.value.toLowerCase()
  console.log(term);
const oldTasks = [...copyTask];
const result = oldTasks.filter((item) => item.taskname.toLowerCase().includes(term))
settask(result)
  }

  return (
    <div className="flex justify-center items-center w-full ">
      <div className="md:w-1/2  m-5 p-5  ">
        <h1 className="text-center">Task Manager</h1>
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-5">
          <div className="border-1 border-gray-400 flex items-center rounded-md p-1 ">
          
            <input
              value={input}
              onChange={(e) => setinput(e.target.value)}
              className="outline-none px-3"
              type="text"
              placeholder="Add a new Task"
            />
              <button
              onClick={handleTask}
              className={` ${updateTask ? 'bg-blue-800' : 'bg-green-800'}  p-2 font-semibold text-white rounded-md`}
            >
              {updateTask ?   <FaCheck /> : <FaPlus />  }
           
            </button>
          </div>
          <div className="border-1 border-gray-400 flex items-center gap-2 rounded-md p-1 ">
            <span className="p-2 font-semibold bg-gray-100 rounded-md border-r ">
              <FaSearch />
            </span>
            <input
            onChange={handleSearch}
              className="outline-none px-3"
              type="text"
              placeholder="Search Task "
            />
          </div>
        </div>
        {/* //list of items */}
        <div className="flex flex-col w-full mt-8 text-gray-700">
          {task.map((item, index) => {
            return (
              <div
                key={index}
                className="border bg-gray-100 border-gray-400 p-2 m-2 bg-light rounded-md  flex-col md:flex-row flex justify-between md:items-center"
              >
                <span
                  className={` ${
                    item.isdone === true
                      ? "line-through decoration-2"
                      : ""
                  } `}
                >
                  {item.taskname}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleCheckAndUncheck(item)}
                    className="bg-green-700 text-white p-2 rounded-md"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => setupdateTask(item)}
                    className="bg-blue-700 text-white p-2 rounded-md"
                  >
                    <FaPencilAlt />
                  </button>

                  <button
                    className="bg-red-700 text-white p-2 rounded-md"
                    onClick={() => handleDeleteButton(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* //toast */}
      </div>
    </div>
  );
};

export default TaskManager;
