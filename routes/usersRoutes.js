import express from "express"
import { createdUser, createTask, deleteTask, deleteUser, findUserBycity, getTaskById, getTaskByType, getTasks, getUserByID, getUsers, patchTask, updateTask, updateUser } from "../controllers/usersContollers.js"


const route =  express.Router()




route.get("/users", getUsers)

route.get("/users/search",findUserBycity)

route.get("/users/:id",getUserByID )

route.post("/users/", createdUser)

route.put("/users/:id", updateUser)

route.delete("/users/delete/:id", deleteUser)

route.get("/tasks", getTasks)

route.get("/tasks/filter", getTaskByType)

route.get("/tasks/:id", getTaskById)

route.put("/tasks/:id", updateTask)

route.delete("/tasks/:id", deleteTask)

route.post("/tasks", createTask)

route.patch("/tasks/:id/toggle", patchTask)



export default route