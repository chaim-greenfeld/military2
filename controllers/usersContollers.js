import fs from "fs/promises";

import express from "express";

const PATH = "./data/targets.json";

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
  const a = JSON.stringify(cities);
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
  const body = req.body
  const data = await fs.readFile(PATH, "utf8");
  const users = JSON.parse(data);
    if(!body){
        res.status(404).json({msg:"not found what to update"})
    }
  const index = users.findIndex((u) => u.id === id);
  console.log(index)
  if (index < 0) {
    res.status(404).json({ msg: "User not found" });
  } else {
    users[index] = {
        id : users[index].id,
      name: (body.name || users[index].name),
      age: (body.age || users[index].age),
      city: (body.city || users[index].city),
    };
    await fs.writeFile(PATH, JSON.stringify(users, null, 2), "utf8");
  }
  
  res.status(200).json(users[index])
};

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id)

    const data = await fs.readFile(PATH, "utf8")
    const users = JSON.parse(data)

    const userswithout = users.filter(u => u.id !== id)

    await fs.writeFile(PATH, JSON.stringify(userswithout, null, 2), "utf8")
    const a = users.find(u => u.id === id)
    res.status(200).send({msg:"success", dataDeleted:a})

}