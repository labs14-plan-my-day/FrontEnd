const express = require('express');
const cors = require('cors');
const port = 3333;

const server = express();
server.use(express.json());
server.use(cors());

const sendUserError = (msg, res) => {
  res.status(422);
  res.json({ Error: msg });
  return;
};

let tasks = [
  {
    title: 'Mow yard',
    description: 'Mow weedeat and trim bushes.',
    time: '10am to 12pm',
    id: 0
  }
];
server.get('/tasks', (req, res) => {
  res.json(tasks);
});
let taskId = tasks.length;

server.post('/tasks', (req, res) => {
  const { title, description, time } = req.body;
  const newTask = { title, description, time, id: taskId };
  if (!title || !description || !time) {
    return sendUserError(
      'Please fill out task.',
      res
    );
  }
  const findTaskByTitle = task => {
    return task.title === title;
  };
  if (tasks.find(findTaskByTitle)) {
    return sendUserError(
      `Task already exists`,
      res
    );
  }

  tasks.push(newTask);
  taskId++;
  res.json(tasks);
});

server.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, time } = req.body;
  const findTaskById = task => {
    return task.id == id;
  };
  const foundTask = tasks.find(findTaskById);
  if (!foundTask) {
    return sendUserError('No Task found by that ID', res);
  } else {
    if (title) foundTask.title = title;
    if (description) foundTask.description = description;
    if (time) foundTask.time = time;
    res.json(tasks);
  }
});

server.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const foundTask = tasks.find(task => task.id == id);

  if (foundTask) {
    const TaskRemoved = { ...foundTask };
    tasks = tasks.filter(task => task.id != id);
    res.status(200).json(tasks);
  } else {
    sendUserError('No task by that ID exists in the task DB', res);
  }
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is listening on port ${port}`);
});
