const express = require("express");
const router = express.Router();
const aiController = require("../controller/aiController");

// Endpoint for chatting with the Gemini AI
router.post("/chat", aiController.chatWithAI);

module.exports = router;
