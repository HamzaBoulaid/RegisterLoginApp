
// importing
import express from "express";
import mongoose from "mongoose";
import User from "./dbUser.js";
import cors from 'cors';

// app config 
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use(cors());

// DB config
const connection_url = "mongodb+srv://hamza:HAMZAbxw@cluster0.ul6lw.mongodb.net/UsersDB?retryWrites=true&w=majority"

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.once('open', () => {
    const msgCollection = db.collection('users');
    console.log("connected to db")
})

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// api routes 
app.post('/login', (req, res) => {
    User.find().where('email').equals(req.body.email).where('password').equals(req.body.password).exec((err, data) => {
        if(data && data[0] && data[0].email === req.body.email && data[0].password === req.body.password) {
            res.send("Ok");
        }
        else res.send("Wrong email or password.");
    })
})

app.post('/register', (req, res) => {
    User.create(req.body, (err, data) => {
        if(err) {
            res.send("Account not created, please try again !");
        }
        else {
            res.send("Ok");
        }
    })
})

app.get('/users', (req, res) => {
    User.find((err, data) => {
        if(err) {
            res.send("Something went wrong");
        }
        else res.send(data);
    })
})

// listen 
app.listen(port, () => console.log(`Listening on localhost:${port}`));