'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

const app = express();
const router = express.Router();


// Conecta no banco
mongoose.connect('mongodb+srv://igor:Igor123456@cluster0.rscq6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//Carrega models
const Tasks = require('./models/tasks_model');

// Carrega as rotas
const indexRoute = require('./routes/index_route');
const tasksRoute = require('./routes/tasks_route');

// Usando o cors para conectar com o front
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Importa as rotas
app.use('/', indexRoute);
app.use('/tasks', tasksRoute);

module.exports = app;

//teste2
//teste3