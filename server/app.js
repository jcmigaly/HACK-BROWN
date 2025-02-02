const express = require('express');
const mongoose = require('mongoose')
const users = require('./routes/users')
const dashboard = require('./routes/dashboard')
const prescription = require('./routes/prescription')


const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost/scriptly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/api/users', users) //route all users endpoints to users file
app.use('/api/dashboard', dashboard) // route all dashboard endpoints to dasboard file
app.use('/api/prescription', prescription)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}... \nMake calls to http://localhost:${port}/`));