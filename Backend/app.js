const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const connectDB = require("./db/db");

const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
const chatRoutes = require("./routes/chat.routes");
const messageRoutes = require("./routes/message.routes");

connectDB();

const app = express();

app.disable("x-powered-by");


// app.use(cors({
//     credentials:true,
//     origin:"http://localhost:5173",
//     allowedHeaders: ["Content-Type", "Authorization"]
// }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

app.use(cors({ 
    credentials: true,
    origin:"https://book-discussion-frontend.vercel.app",
    allowedHeaders: ["Content-Type", "Authorization"]
 }));

// API Routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Hello World");
});

module.exports = app;
