import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  society: mongoose.Types.ObjectId;
  fest?: mongoose.Types.ObjectId;
  description: string;
  date: Date;
  venue: string;
  coverImage?: string;
  registrationUrl?: string;
  status: "upcoming" | "completed" | "ongoing";
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    society: { type: Schema.Types.ObjectId, ref: "Society", required: true },
    fest: { type: Schema.Types.ObjectId, ref: "Fest" },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    coverImage: { type: String },
    registrationUrl: { type: String },
    status: {
      type: String,
      enum: ["upcoming", "completed", "ongoing"],
      default: "upcoming",
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
