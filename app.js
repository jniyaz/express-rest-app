// Import Libraries
import express from 'express'
import db from './db/db';

// set express application
const app = express();

// Get todos data
app.get('/api/v1/todos', (req, res) => {
    res.status(200).send({
        success: true,
        message: "Todos",
        data: db
    })
});

// Port
const port = 4000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
