import fs from "fs/promises";
import { title } from "process";

const PATH = "./data/targets.json";
const PATH2 = "./data/tasks.json";

async function writeTasks(tasks) {
  await fs.writeFile(PATH2, JSON.stringify(tasks, null, 2));
}

async function readTasks() {
  const data = await fs.readFile(PATH2, "utf8");
  const tasks = JSON.parse(data);
  return tasks;
}

export const getUsers = async (req, res) => {
  const data = await fs.readFile(PATH, "utf8");
  const users = JSON.parse(data);
  res.status(200).send({ data: users });
};

export const findUserBycity = async (req, res) => {
  const city = req.query.city;
  const data = await fs.readFile(PATH, "utf8");
  const users = JSON.parse(data);
  const cities = users.filter((u) => u.city === city);
  res.status(200).json(cities);
};

export const getUserByID = async (req, res) => {
  const id = parseInt(req.params.id);
  const data = await fs.readFile(PATH, "utf8");
  const users = JSON.parse(data);
  const user = users.find((u) => u.id === id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.status(200).json(user);
  }
};

export const createdUser = async (req, res) => {
  const { body } = req;

  const data = await fs.readFile(PATH, "utf8");
  const users = JSON.parse(data);
  const newUser = {
    id: users.length + 1,
    name: body.name || "",
    age: body.age || 20,
    city: body.city || false,
  };
  users.push(newUser);
  let a = await fs.writeFile(PATH, JSON.stringify(users, null, 2), "utf8");

  res.status(201).json({ newdata: newUser });
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const data = await fs.readFile(PATH, "utf8");
  const users = JSON.parse(data);
  if (!body) {
    res.status(404).json({ msg: "not found what to update" });
  }
  const index = users.findIndex((u) => u.id === id);
  console.log(index);
  if (index < 0) {
    res.status(404).json({ msg: "User not found" });
  } else {
    users[index] = {
      id: users[index].id,
      name: body.name || users[index].name,
      age: body.age || users[index].age,
      city: body.city || users[index].city,
    };
    await fs.writeFile(PATH, JSON.stringify(users, null, 2), "utf8");
  }

  res.status(200).json(users[index]);
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  const data = await fs.readFile(PATH, "utf8");
  const users = JSON.parse(data);

  const userswithout = users.filter((u) => u.id !== id);

  await fs.writeFile(PATH, JSON.stringify(userswithout, null, 2), "utf8");
  const a = users.find((u) => u.id === id);
  res.status(200).send({ msg: "success", dataDeleted: a });
};

export const getTasks = async (req, res) => {
  const data = await fs.readFile(PATH2, "utf8");
  const tasks = JSON.parse(data);
  res.status(200).send(tasks);
};

export const getTaskById = async (req, res) => {
  const id = req.params.id;
  const intId = parseInt(id);

  const tasks = await readTasks();

  const task = tasks.find((t) => t.id === intId);
  if (!task) {
    res.status(404).send("task not found");
  } else {
    res.status(200).json({ msg: "success", data: task });
  }
};

export const getTaskByType = async (req, res) => {
  const completed = req.query.completed;
  const priority = req.query.priority;
  console.log(completed, priority)
  if (completed) validCompleted(req, res);
  else if (priority) valiidPriority(req, res);
  else res.status(404).json({msg:"not found"})
};

const validCompleted = async (req, res) => {
  const completed = req.query.completed;
  const tasks = await readTasks();
  if (completed === "true") {
    const compTrue = tasks.filter((t) => t.completed === true);
    res.status(200).json({ completed: true, data: compTrue });
  } else if (completed == "false") {
    const compFalse = tasks.filter((t) => t.completed === false);
    res.status(200).json({ completed: false, data: compFalse });
  } else {
    res.json({ allData: tasks });
  }
};

const valiidPriority = async (req, res) => {
  const priority = req.query.priority;
  const tasks = await readTasks();
  if (priority === "high") {
    const task = tasks.filter((t) => t.priority === priority);
    res.status(200).json({ priority, data: task });
  } else if (priority === "medium") {
    const task = tasks.filter((t) => t.priority === priority);
    res.status(200).json({ priority, data: task });
  } else if (priority === "low") {
    const task = tasks.filter((t) => t.priority === priority);
    res.status(200).json({ priority, data: task });
  } else {
    res.json({ allTask: tasks });
  }
};

export const createTask = async (req, res) => {
  const body = req.body
  const tasks = await readTasks()
  const newData = {
    id:tasks.length + 1,
    title:body.title,
    completed:body.completed,
    priority:body.priority
  }
  tasks.push(newData)
  console.log(tasks)
  
  await writeTasks(tasks)

  res.status(201).json(tasks)
}

export const updateTask = async (req, res) => {
  const id = req.params.id
  const intId = parseInt(id)
  const body = req.body
  const tasks = await readTasks()

  if(!body){
    res.status(200).send("There is nothing to update.")
  }
  const index = tasks.findIndex(t => t.id === intId)
  if(index < 0){
    res.status(200).send("There is no one to update.")
  }
  tasks[index] = {
     id: tasks[index].id,
      title: body.title || tasks[index].title,
      completed: body.completed || tasks[index].completed,
      priority: body.priority || tasks[index].priority,
  }
  await writeTasks(tasks)
  res.status(200).json(tasks[index])

}

export const patchTask = async (req, res) => {
  const id = req.params.id
  const intId = parseInt(id)

  const tasks = await readTasks()

  const task = tasks.findIndex(t => t.id === intId)

  if(tasks[task].completed === true){
    tasks[task].completed = false
  }else if(tasks[task].completed === false){
    tasks[task].completed = true
  }
  await writeTasks(tasks)
  res.status(200).json({msg:"The update was successful.", data:tasks[task]})
}

export const deleteTask = async (req, res) => {
  const id = req.params.id
  const intId = parseInt(id)

  const tasks = await readTasks()

  const index = tasks.findIndex(t => t.id === intId)

  if(index < 0){
    res.status(404).send("What are you kidding?")
  }
  const taskDelete = tasks[index]
  tasks.splice(index, 1)
  await writeTasks(tasks)
  res.status(200).json({msg:"success", data:taskDelete})
}