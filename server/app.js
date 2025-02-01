const express = require('express');
const mongoose = require('mongoose')

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost/nutrition')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}... \nMake calls to http://localhost:${port}/`));