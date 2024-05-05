const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors=require("cors");
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

// Load environment variables from .env file
dotenv.config();

// Connection to Redis
// const redisClient = createClient({
//     host: REDIS_URL,
//     port: REDIS_PORT
// });

// // Error handling for Redis client
// redisClient.on('error', (err) => {
//     console.error('Redis Client Error:', err)})
//     .connect();

// Connection to MongoDB
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectToMongoose = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        setTimeout(connectToMongoose, 5000);
    }
};

connectToMongoose(); // Calling the function

app.use(cors());

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.enable("trust proxy"); //required for production mainly

// Session configuration
app.use(session({
    store:MongoStore.create({
        mongoUrl:MONGO_URL,
        crypto:{
            secret:SESSION_SECRET
        },
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 60000, 
        httpOnly: true
    }
}));

// Routes
app.get("/api/v1", (req, res) => {
    res.send("<h1>Hello World</h1>");
    console.log("yeah it ran");
});

// Example routes for posts and users
const postrouter = require("./routes/postroutes");
const userrouter = require("./routes/userroutes");
app.use("/api/v1/posts", postrouter);
app.use("/api/v1/users", userrouter);

// Server listening
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("App is listening on port", port);
});
