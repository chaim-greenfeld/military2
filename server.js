import express from "express"
import usersRoutes from "./routes/usersRoutes.js"

const app = express()
const PORT = process.env.PORT


app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})


app.use("/",usersRoutes)


app.listen(PORT, () => {
    console.log(`The server is run ${PORT}`)
})

