import express from "express"
import fs from "fs/promises"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())




// Handle GET requests
app.get('/get-example', (req, res) => {
  res.send('This is a GET request');
});

// Handle POST requests
app.post('/post-example', (req, res) => {
  res.send('This is a POST request');
});

// Handle PUT requests
app.put('/put-example', (req, res) => {
  res.send('This is a PUT request');
});

// Handle DELETE requests
app.delete('/delete-example', (req, res) => {
  res.send('This is a DELETE request');
});

// Handle all HTTP methods
app.all('/all-example', (req, res) => {
  res.send(`This handles all HTTP methods: ${req.method}`);
});




























































































app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
})