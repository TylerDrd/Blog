const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.post('/register', (req, res) => {
    res.status(700).send('good');
});

app.listen(5000);