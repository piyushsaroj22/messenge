import Message from "../models/message.model.js";
import User from "../models/user.model.js";

class MessageService {
  async getChatList(loggedInUserId) {
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    }).sort({ createdAt: -1 });

    const processedUsers = new Set();
    const chatList = [];

    for (const message of messages) {
      const partnerId =
        message.senderId.toString() === loggedInUserId.toString()
          ? message.receiverId.toString()
          : message.senderId.toString();

      if (processedUsers.has(partnerId)) continue;

      processedUsers.add(partnerId);

      const user = await User.findById(partnerId).select("-password");

      if (!user) continue;

      const unreadCount = await Message.countDocuments({
        senderId: partnerId,
        receiverId: loggedInUserId,
        status: {
          $in: ["sent", "delivered"],
        },
      });

      chatList.push({
        ...user.toObject(),
        lastMessage: message,
        unreadCount,
      });
    }

    return chatList;
  }

  async getChatPreview(loggedInUserId, partnerId) {
    const user = await User.findById(partnerId).select("-password");

    if (!user) return null;

    const lastMessage = await Message.findOne({
      $or: [
        {
          senderId: loggedInUserId,
          receiverId: partnerId,
        },
        {
          senderId: partnerId,
          receiverId: loggedInUserId,
        },
      ],
    }).sort({ createdAt: -1 });

    const unreadCount = await Message.countDocuments({
      senderId: partnerId,
      receiverId: loggedInUserId,
      status: {
        $in: ["sent", "delivered"],
      },
    });

    return {
      ...user.toObject(),
      lastMessage,
      unreadCount,
    };
  }
}

const messageService = new MessageService();

export default messageService;
