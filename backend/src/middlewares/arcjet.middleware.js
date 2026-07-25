import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Rate limit exceeded. Please try again later.",
        });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({
          message: "Access denied: Bot detected",
        });
      }

      return res.status(403).json({
        message: "Access denied: Suspicious activity detected",
      });
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }

    return next();
  } catch (error) {
    console.error("Error in Arcjet middleware:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
