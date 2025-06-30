const ChatMessage = require("../models/ChatMessage");

exports.saveMessage = async (req, res) => {
  try {
    const { text, interest } = req.body;
    const email = req.user.email;

    const newMsg = new ChatMessage({ user: email, interest, text });
    await newMsg.save();

    res.status(201).json({ message: "Message saved", chat: newMsg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save message" });
  }
};

exports.getGroupMessages = async (req, res) => {
  try {
    const interest = req.params.interest;
    const messages = await ChatMessage.find({ interest }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

exports.clearGroupChat = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Only admin can clear chat." });
    }
    const interest = req.params.interest;
    await ChatMessage.deleteMany({ interest });
    res.json({ message: "Chat cleared." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to clear chat" });
  }
};
