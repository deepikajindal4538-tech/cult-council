import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISocietyObjectConfig {
  type: "camera" | "discoball" | "letter" | "paintbrush" | "clapboard" | "vinyldisc" | string;
  imageUrl: string;
  modelUrl?: string; // Future 3D R3F GLB support
  fallbackColor: string;
  letterContent?: string; // Specifically for Sarasva rolled letter text
}

export interface ISociety extends Document {
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  accentColor: string;
  washColor: string; // Soft background wash color during hero scroll
  order: number;
  objectConfig: ISocietyObjectConfig;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    email?: string;
  };
  leads: Array<{
    name: string;
    role: string;
    avatarUrl?: string;
  }>;
  stats: {
    membersCount?: number;
    eventsPerYear?: number;
    foundedYear?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SocietySchema = new Schema<ISociety>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    accentColor: { type: String, required: true },
    washColor: { type: String, required: true },
    order: { type: Number, required: true, default: 0 },
    objectConfig: {
      type: {
        type: String,
        required: true,
      },
      imageUrl: { type: String, required: true },
      modelUrl: { type: String },
      fallbackColor: { type: String, default: "#E7E2DA" },
      letterContent: { type: String },
    },
    socialLinks: {
      instagram: String,
      youtube: String,
      linkedin: String,
      email: String,
    },
    leads: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        avatarUrl: String,
      },
    ],
    stats: {
      membersCount: { type: Number, default: 0 },
      eventsPerYear: { type: Number, default: 0 },
      foundedYear: { type: Number },
    },
  },
  { timestamps: true }
);

export const Society: Model<ISociety> =
  mongoose.models.Society || mongoose.model<ISociety>("Society", SocietySchema);
