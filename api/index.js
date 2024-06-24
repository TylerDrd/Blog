const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');

require('dotenv').config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION_URI)
   .then(console.log('connected to mongoDB'))
    .catch((e)=>
    {
    console.log(e);
    }
);

app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    const userDoc = await User.create({username: username, email: email, password: password});
    res.json(userDoc);
});

app.listen(5000, () => {
    console.log('Listening on port 5000')
});

//enTtBYvk74IUpqKQ - mongodb password 
//mongodb+srv://jainilpatel0909:enTtBYvk74IUpqKQ@blog-cluster.07ix2tj.mongodb.net/?retryWrites=true&w=majority&appName=Blog-Cluster