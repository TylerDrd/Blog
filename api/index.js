const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');

require('dotenv').config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION_URI)
   .then(console.log('connected to mongoDB'))
    .catch((e)=>{
        console.log(e);
    }
);

app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const userDoc = await User.create({
            username: username, 
            email: email, 
            password: hashedPassword
        });
        res.json(userDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

app.listen(5000, () => {
    console.log('Listening on port 5000')
});

//enTtBYvk74IUpqKQ - mongodb password 
//mongodb+srv://jainilpatel0909:enTtBYvk74IUpqKQ@blog-cluster.07ix2tj.mongodb.net/?retryWrites=true&w=majority&appName=Blog-Cluster