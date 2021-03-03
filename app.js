const Joi = require('joi');
// const app = require('express')();
const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const app = express();
app.set('view engine', 'hbs');
app.use('/assets', express.static(path.join(__dirname, './assets')));
app.use('/js', express.static(path.join(__dirname, './js')));
app.use(express.json());

app.get('/', (req, res) => {
  // console.log('User hit the resource');
  // res.send('Hello nodejs!!!');
  // res.render('index');
  const future = new Date().getFullYear() + 100;
  res.render('index', {
    pageTitle: 'Node JS',
    pageBody: 'Hello NODEJS',
    future: future
  });
});

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(course);
}

app.get('/contact', (req, res) => {
  // res.send('The contact data.');
  res.send('<h1>The contact data.</h1>');
});

app.get('/subpage', (req, res) => {
  res.send('<h1>Subpage</h1>');
  // res.status(200).send('<h1>Subpage</h1>');
});

// app.get('/mywebsite', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'mywebsite.html'));
// });
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/courses', (req, res) => {
  res.send(courses);
});

app.post('/courses', (req, res) => {
  // if (!req.body.name || req.body.name.length < 3) {
  //   res
  //     .status(400)
  //     .send('Name is required and should be minimum 3 characters.');
  //   return;
  // }

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID was not found');

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete('/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID was not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.get('/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID was not found');
  res.send(course);
});

app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>');
});

// app.listen(port);
app.listen(port, () => console.log(`Listenig on port ${port}...`));
// app.listen(port, err => {
//   if (err) {
//     return console.log('coś poszło nie tak...:', err);
//   }
//   console.log('serwer działa na porcie', port);
// });
