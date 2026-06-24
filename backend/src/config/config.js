import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

if (!process.env.PORT) {
  throw new Error("PORT is not defined in the environment variables");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV is not defined in the environment variables");
}

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error(
    "CLOUDINARY_CLOUD_NAME is not defined in the environment variables",
  );
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error(
    "CLOUDINARY_API_KEY is not defined in the environment variables",
  );
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error(
    "CLOUDINARY_API_SECRET is not defined in the environment variables",
  );
}

if (!process.env.ARCJET_KEY) {
  throw new Error("ARCJET_KEY is not defined in the environment variables");
}

if (!process.env.ARCJET_ENV) {
  throw new Error("ARCJET_ENV is not defined in the environment variables");
}

if (
  process.env.NODE_ENV !== "development" &&
  process.env.NODE_ENV !== "production"
) {
  throw new Error("NODE_ENV must be either 'development' or 'production'");
}

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in the environment variables");
}

if (!process.env.EMAIL_FROM) {
  throw new Error("EMAIL_FROM is not defined in the environment variables");
}

if (!process.env.EMAIL_FROM_NAME) {
  throw new Error(
    "EMAIL_FROM_NAME is not defined in the environment variables",
  );
}

if (!process.env.CLIENT_URL) {
  throw new Error("CLIENT_URL is not defined in the environment variables");
}

if (!process.env.CLIENT_URL_2) {
  throw new Error("CLIENT_URL_2 is not defined in the environment variables");
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  ARCJET_KEY: process.env.ARCJET_KEY,
  ARCJET_ENV: process.env.ARCJET_ENV,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
  CLIENT_URL: process.env.CLIENT_URL,
  CLIENT_URL_2: process.env.CLIENT_URL_2,
};

export default config;
