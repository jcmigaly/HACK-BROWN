const express = require('express');
const mongoose = require('mongoose')
const users = require('./routes/users')

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost/scriptly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/api/users', users) //route all users endpoints to users file


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}... \nMake calls to http://localhost:${port}/`));