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
app.use('/Uploads', express.static(__dirname + '/Uploads'))

mongoose.connect(process.env.MONGO_CONNECTION_URI)
   .then(console.log('connected to mongoDB'))
    .catch((e)=>{
        console.log(e);
    }
);


const auth = (req,res,next)=>{
    try{

        const token = req.headers.authorization || "";
        if(!token){
            return res.status(401).send();
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
       // console.log(decoded);
        if(!decoded){
            return res.status(401).send();
        }
        req.user = decoded;
        next();        

    }
    catch(e){
        console.log(e);
        res.status(500).send();
    }
}




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
    if(!finduser){
        return res.status(401).send("User not found");
    }
    const passOk = await bcrypt.compare(password, finduser.password);
    if(passOk)
    {
        //logged in 
        jwt.sign(
            { "username" : finduser.username,"id" : finduser._id },
            process.env.ACCESS_TOKEN_SECRET,
            {},
            (err, token) => {
                if(err) throw err;
                res.status(200).json({
                    username,
                    id: finduser._id,
                    token
                });
            }
        );
    }
    else{
        res.status(401).json({message: 'Invalid username or password'});
    }
});

app.get('/profile',auth, (req,res) => {
    
    const id = req.user.id;

    const data = User.findById(id);
    if(!data) alert("No such User exists")
   // console.log(data);
    res.status(200).json(data);

});


app.post('/post', upload.single('file'), async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        const newPath = path + '.' + extension;
        fs.renameSync(path, newPath);

        const token  = req.headers.authorization;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, async (err, info) => {
            if (err) return res.status(401).json({ error: 'Invalid token' });
            const { title, summary, content } = req.body;
            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover: newPath,
                author: info.id,
            });
            res.json(postDoc);
        });
    } catch (error) {
        console.error('Error processing the post request', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/post', upload.single('file'), async (req,res) => {
        let newPath = null;
        if(req.file)
        {
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const extension = parts[parts.length - 1];
            newPath = path + '.' + extension;
            fs.renameSync(path, newPath);
        }
        
        const token  = req.headers.authorization;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, async (err, info) => {
            if (err) return res.status(401).json({ error: 'Invalid token' });
            const { id, title, summary, content } = req.body;
            const postdoc = await Post.findById(id);
            const isAuthor = JSON.stringify(postdoc.author) === JSON.stringify(info.id);
            if(!isAuthor)
            {
                return res.status(400).json('You are not the Author!');
            }

            postdoc.title = title;
            postdoc.summary = summary;
            postdoc.content = content;
            postdoc.cover = newPath ? newPath : postdoc.cover;
            await postdoc.save();
            res.json(postdoc);
        });
});

app.get('/post', async (req,res) => {
    res.json(
      await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    );
  });

app.get('/post/:id', async (req,res) => {
    const {id} = req.params;
    const postid = await Post.findById(id).populate('author', ['username']);
    res.json(postid);
});

app.get('/posts/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const posts = await Post.find({ author: user._id })
            .populate('author', ['username'])
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts by username:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/user/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update profile
app.put('/update-profile', auth, async (req, res) => {
    const { email, password } = req.body;
    try {
        const updatedFields = {};
        if (email) updatedFields.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.password = hashedPassword;
        }
        const user = await User.findByIdAndUpdate(req.user.id, updatedFields, { new: true });
        res.status(200).json({ success: true, username: user.username, email: user.email });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


app.listen(5000, () => {
    console.log('Listening on port 5000')
});

//enTtBYvk74IUpqKQ - mongodb password 
//mongodb+srv://jainilpatel0909:enTtBYvk74IUpqKQ@blog-cluster.07ix2tj.mongodb.net/?retryWrites=true&w=majority&appName=Blog-Cluster