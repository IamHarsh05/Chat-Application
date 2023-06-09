const io = require("socket.io")(8900,{
    cors:{
        origin: "http://localhost:3000"
    }
});

let users = [];

const addUser = (userId, socketId) =>{
    !users.some(user => user.userId === userId) && 
        users.push({userId,socketId});
};

const removeUser = (socketId) =>{
    users = users.filter(user => user.socketId !== socketId)
};

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
};

io.on("connection", (socket) => {
    console.log("user connected to socket ")
    //take userId and socketId fro user
    socket.on("addUser",userId => {
        addUser(userId, socket.id);
        io.emit("getUser",users);
    });

    //send & get Message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage",{
            senderId,
            text
        })
    })

    //remove user from socket
    socket.on("disconnect", () =>{
        console.log("user disconnected");
        removeUser(socket.id);
        io.emit("getUser",users);
    })
});