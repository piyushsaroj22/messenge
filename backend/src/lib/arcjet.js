import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import config from "../config/config.js";

const aj = arcjet({
  key: config.ARCJET_KEY,
  rules: [
    shield({ mode: "live" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    slidingWindow({
      mode: "LIVE",
      max: 100,
      interval: 60,
    }),
  ],
});

export default aj;
