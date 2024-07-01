const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest: 'Uploads/'}) //upload middleware
const fs = require('fs');//to rename the image file saved in uploads

require('dotenv').config();
app.use(cors({credentials: true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

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
        res.status(200).json(userDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

app.post('/login', async (req,res) =>
{
    const {username, password} = req.body;
    const finduser = await User.findOne({username});
    const passOk = await bcrypt.compare(password, finduser.password);
    if(passOk)
    {
        //logged in 
        jwt.sign(
            { "username" : finduser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {},
            (err, token) => {
                if(err) throw err;
                res.cookie('token',token).json({username});
            }
        );
    }
    else{
        res.status(401).json({message: 'Invalid username or password'});
    }
});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json('ok');
})

app.post('/post', upload.single('file') ,async (req,res) => {

    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1]; //grabbing extension of image file
    const newpath = path+'.'+extension;
    fs.renameSync(path, newpath); //renaming the file to avoid overwriting

    //the req. payload contains title, summary, content and file.
    // we want to save it to database

    const {title,summary,content} = req.body;
    const postdoc = await Post.create({
        title,
        summary,
        content,
        cover:newpath
    })
    res.json(postdoc);
    //postdoc contains title, summary, content, cover and timestamp

   // res.json(req.file) // lot of attributes like filename, size,path, destination etc
})

app.listen(5000, () => {
    console.log('Listening on port 5000')
});

//enTtBYvk74IUpqKQ - mongodb password 
//mongodb+srv://jainilpatel0909:enTtBYvk74IUpqKQ@blog-cluster.07ix2tj.mongodb.net/?retryWrites=true&w=majority&appName=Blog-Cluster