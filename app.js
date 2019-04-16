// Import Libraries
import express from 'express'
import db from './db/db';
import bodyParser from 'body-parser';

// set express application
const app = express();

// Parse Requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
// Get All
app.get('/api/v1/todos', (req, res) => {
    res.status(200).send({
        success: true,
        message: "data successful",
        data: db
    })
});

// Post
app.post('/api/v1/todos', (req, res) => {
    if(!req.body.title) {
        return res.status(400).send({
          success: 'false',
          message: 'title is required'
        });
    } else if(!req.body.description) {
        return res.status(400).send({
          success: 'false',
          message: 'description is required'
        });
      }
    const todo = {
       id: db.length + 1,
       title: req.body.title,
       description: req.body.description
    }
    db.push(todo);

    return res.status(201).send({
       success: 'true',
       message: 'Added successfully',
       data: todo
    })
});

// Get single
app.get('/api/v1/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
    db.map((todo) => {
        if (todo.id === id) {
          return res.status(200).send({
            success: 'true',
            message: 'data successful',
            data: todo,
          });
        }
    });
    return res.status(404).send({
        success: 'false',
        message: 'data does not exist',
    });
});


// Port
const port = 4000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
