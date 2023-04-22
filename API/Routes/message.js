const router = require("express").Router();
const Message = require("../Models/Message");

//add

router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);
    try{
        const savedmessage = await newMessage.save();
        res.status(200).send(savedmessage);
    }
    catch(err){
        res.status(500).json(err);
    }
});


//get messages

router.get("/:conversationId", async (req, res) =>{
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).send(messages);
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;