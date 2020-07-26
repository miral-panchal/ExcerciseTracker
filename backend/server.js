const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB connection successful.");
})

const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');

app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);

app.listen(port, () => {
	console.log('Server running on port: '+ port);
})