import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res
          .status(429)
          .json({ message: "Rate limit exceeded. Please try again later." });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ message: "Access denied: Bot detected" });
      } else {
        return res
          .status(403)
          .json({ message: "Access denied: Suspicious activity detected" });
      }
    }

    // check for spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }
    next();
  } catch (error) {
    console.error("Error in Arcjet middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next();
  }
};
