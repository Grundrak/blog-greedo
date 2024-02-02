const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const route = require('./routes/api');

app.use(express.json());



module.exports = app ;