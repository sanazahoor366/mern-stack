// import { BASE_URI } from "../api/api";
const BASE_URI = "https://mern-stack-blgq-api.vercel.app";

export const createTask = async (taskObj) => {
  const url = `${BASE_URI}/create/task`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
export const getTask = async () => {
  const url = `${BASE_URI}/get/task`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const deleteTask = async (id) => {
  const url = `${BASE_URI}/delete/task/${id}`;
  const options = {
    method: "DELETE",
    header: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    //  console.log(data);

    return data;
  } catch (error) {
    return error;
  }
};
export const updateTaskById = async (id, reqBody) => {
  const url = `${BASE_URI}/update/task/${id}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
