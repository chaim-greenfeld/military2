// import express from "express"
// import fs from "fs/promises"

// const app = express()
// const PORT = process.env.PORT || 8000
// const PATH = "./data/targets.json"

// app.use(express.json())



// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`)
//     next()
// })



// app.get("/health", (req, res) => {
//     res.status(200).json({status: "ok", serverTime: "ISO_TIMESTAMP"})
// })



// app.get("/briefing", (req, res) => {
//     const aa = req.headers["client-unit"]
//     if(!aa || aa!== "Golani"){
//         res.status(400).send("You are a big fool.")
//     }
//     else{
//         res.status(200).json({"unit": "Golani", msg: "briefing delivered"})
//     }
// })



// app.get("/targets/:id",async (req, res) => {
//     const id = req.params.id
//     const ff = await fs.readFile(PATH, "utf8")
//     const fsa = JSON.parse(ff)
//     const filiter = fsa.find(t => t.id === String(id))
//     if(!filiter){
//         res.status(404).send("not found")
//     }else{
//         res.json({data:filiter})
//     }
// })



// app.get("/targets", (req, res) => {
//     const {region} = req.query
//     const {status} = req.query
//     const {minPriority} = req.query
//     res.status(200).json({region, status, minPriority})
// })



// app.post("/targets",async (req, res) => {
//     const aw = req.body
//     const newData = {
//         id:1,
//         codeName: aw.codeName || "asd",
//         region:aw.region || "asd",
//         priority:aw.priority || "asd",
//         status:aw.status || "asd",
//         createdAt:new Date()
//     }


//     const read = await fs.readFile(PATH, "utf8")
//     const read2 = JSON.parse(read)
//     read2.push(newData)
//     await fs.writeFile(PATH, JSON.stringify(read2, null, 2), "utf8")
//     const read3 = await fs.readFile(PATH, "utf8")
//     const read4 = JSON.parse(read3)
//     res.status(201).json({r:read4})
// })

































































// app.listen(PORT, () => {
//     console.log(`server is run ${PORT}`)
// })