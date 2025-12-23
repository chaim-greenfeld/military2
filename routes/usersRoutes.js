import express from "express"
import { createdUser, deleteUser, findUserBycity, getUserByID, getUsers, updateUser } from "../controllers/usersContollers.js"


const route =  express.Router()




route.get("/users", getUsers)

route.get("/users/search",findUserBycity)

route.get("/users/:id",getUserByID )

route.post("/users/", createdUser)

route.put("/users/:id", updateUser)

route.delete("/users/delete/:id", deleteUser)

export default route