import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import messageService from "../services/message.service.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json({ contacts: filteredUsers });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const chatList = await messageService.getChatList(req.user._id);

    res.status(200).json({
      chatPartners: chatList,
    });
  } catch (error) {
    console.error("Error fetching chat partners:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getChatPreview = async (req, res) => {
  try {
    const preview = await messageService.getChatPreview(
      req.user._id,
      req.params.id,
    );

    if (!preview) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(preview);
  } catch (error) {
    console.error("Error fetching chat preview:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const myid = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myid, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myid },
      ],
    });
    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, clientId } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Validation
    if (!text && !image) {
      return res.status(400).json({
        message: "Text or image is required.",
      });
    }

    if (senderId.equals(receiverId)) {
      return res.status(400).json({
        message: "Cannot send messages to yourself.",
      });
    }

    const receiverExists = await User.exists({
      _id: receiverId,
    });

    if (!receiverExists) {
      return res.status(404).json({
        message: "Receiver not found.",
      });
    }

    // Upload image if exists
    let imageUrl = "";

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Create message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      status: "sent",
      clientId,
    });

    // Receiver online?
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      newMessage.status = "delivered";
      await newMessage.save();
    }

    // Fresh message from DB
    const message = await Message.findById(newMessage._id);

    // Receiver ko realtime message
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }

    // Sender ko realtime message
    const senderSocketId = getReceiverSocketId(senderId);

    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", message);
    }

    // Sender ko delivered status
    if (receiverSocketId && senderSocketId) {
      io.to(senderSocketId).emit("messageDelivered", {
        clientId,
      });
    }

    // Response
    return res.status(201).json({
      message: "Message sent successfully",
      newMessage: message,
    });
  } catch (error) {
    console.error("Error sending message:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const markMessagesAsSeen = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: senderId } = req.params;

    await Message.updateMany(
      {
        senderId,
        receiverId: myId,
        status: { $ne: "seen" }, // Jo messages abhi seen nahi hue
      },
      {
        $set: {
          status: "seen",
        },
      },
    );

    const updatedMessages = await Message.find({
      senderId,
      receiverId: myId,
      status: "seen",
    }).select("_id");

    const senderSocketId = getReceiverSocketId(senderId);

    if (senderSocketId) {
      io.to(senderSocketId).emit("messagesSeen", {
        messageIds: updatedMessages.map((msg) => msg._id.toString()),
      });
    }

    res.status(200).json({
      message: "Messages marked as seen",
    });
  } catch (error) {
    console.error("Error marking messages as seen:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}; //=====================================================Newly Added Function=====================================================
