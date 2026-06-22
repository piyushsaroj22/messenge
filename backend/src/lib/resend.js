import { Resend } from "resend";
import config from "../config/config.js";

export const resendClient = new Resend(config.RESEND_API_KEY);

export const sender = {
  email: config.EMAIL_FROM,
  name: config.EMAIL_FROM_NAME,
};
