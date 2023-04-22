const express = require('express');
const app = express();
const mongoos = require("mongoose");
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./Routes/users');
const authRoute = require('./Routes/auth');
const postRoute = require('./Routes/post');
const conversationRoute = require('./Routes/conversation');
const messageRoute = require('./Routes/message');
const multer = require('multer');
const path = require("path");

dotenv.config({
    path: './.env'
}
    
);

mongoos
    .connect(process.env.MONGO_URL
        )
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

app.use("/images",express.static(path.join(__dirname,"public/images"))); 

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "public/images")
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage});
app.post("/API/upload", upload.single("file"), (req, res) => {
    try{
        return res.status(200).json("File successfully uploaded");
    }
    catch(err){
        console.log(err);
    }
}) 

app.use("/API/users", userRoute);
app.use("/API/auth", authRoute);
app.use("/API/post", postRoute);
app.use("/API/conversations", conversationRoute);
app.use("/API/message", messageRoute);

app.listen(8800,()=>{
    console.log("Backend listening on");
})
