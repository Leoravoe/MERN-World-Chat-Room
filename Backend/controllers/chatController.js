const Chat = require('../models/chats');


module.exports.chat = async (req,res) => {
    try {
        const chat = await Chat.create(req.body);
        // console.log(chat)
        res.status(201).json(chat)
    } catch (error) {
        res.status(404).json(error);
    }

}
module.exports.chatget = async (req, res)=>{
    try {
        const message = await Chat.find();
        res.status(200).json(message);
    } catch (error) {
        res.status(404).json(error);
    }
}