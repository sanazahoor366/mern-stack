import TodoMOdel from "../model/user.js";

export const createTodo = async (req, res) => {
  try {
    const body = req.body;
    if (!body.taskname) {
      return res
        .status(400)
        .json({ message: "Task name is required", success: false });
    }
    const createTask = new TodoMOdel(body);
    await createTask.save();
    res
      .status(201)
      .json({ message: "Task is created successfull", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

export const getAllTask = async (req, res) => {
  try {
    // const {todoname, isdone} = req.body
    const getAllData = await TodoMOdel.find({});
    res.status(200).json({ success: true, data: getAllData });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    // const {taskname, isdone} = req.body
    // const obj = {};
    const update = await TodoMOdel.findByIdAndUpdate(id, obj);
    if (!update) {
      return res
        .status(404)
        .json({ message: "Task not Found", success: false });
    }
    res
      .status(200)
      .json({ message: "task updated successfull", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};
export const deleteTask = async (req, res) => {
  const id = req.params.id;
  const delData = await TodoMOdel.findByIdAndDelete(id);
  res
    .status(203)
    .json({
      message: "your data has been deleted",
      deletedData: delData,
      success: true,
    });
};
