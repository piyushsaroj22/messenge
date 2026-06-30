import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { arcjetMiddleware } from "../middlewares/arcjet.middleware.js";

import {
  getAllContacts,
  getChatPartners,
  getMessageByUserId,
  sendMessage,
  markMessagesAsSeen,
} from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.use(arcjetMiddleware, protectRoute); // Apply this middleware to all routes in this router in the correct order

messageRouter.get("/contacts", getAllContacts); // http://localhost:3000/api/messages/contacts

messageRouter.get("/chats", getChatPartners); // http://localhost:3000/api/messages/chats

messageRouter.get("/:id", getMessageByUserId); // http://localhost:3000/api/messages/:id

messageRouter.post("/send/:id", sendMessage); // http://localhost:3000/api/messages/send/:id

messageRouter.patch("/seen/:id", protectRoute, markMessagesAsSeen); // http://localhost:3000/api/messages/seen/:id=====================================================Newly Added Function=====================================================

export default messageRouter;
