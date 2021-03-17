const { Router } = require('express');
const cController = require('../controllers/chatController')

const router = Router();

router.post('/chats',cController.chat)
router.get('/chats/messages',cController.chatget)

module.exports = router;