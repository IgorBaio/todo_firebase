'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Criando o esquema do banco de dados
const schema = new Schema({    
    
    title: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
        required: true,
    },

    doneAt: {
        type: String,
        required: false,
    },
    estimateAt: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },

    uid: {
        type: String,
        required: true,
    },

    idlocal: {
        type: String,
        required: true,
    },

    
});

module.exports = mongoose.model('Tasks', schema);