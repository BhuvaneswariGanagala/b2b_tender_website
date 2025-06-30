const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const protect = require("../mildlewares/authMiddleware");

router.post("/send", protect, chatController.saveMessage);
router.get("/:interest", protect, chatController.getGroupMessages);
router.delete("/:interest", protect, chatController.clearGroupChat);

module.exports = router;
