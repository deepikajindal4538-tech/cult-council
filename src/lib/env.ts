import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  MONGODB_URI: z.string().default("mongodb://127.0.0.1:27017/iiita_cultural_council"),
  FLICKR_API_KEY: z.string().optional().default(""),
  FLICKR_USER_ID: z.string().optional().default(""),
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default("http://localhost:3000"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  FLICKR_API_KEY: process.env.FLICKR_API_KEY,
  FLICKR_USER_ID: process.env.FLICKR_USER_ID,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
