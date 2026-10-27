import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFest extends Document {
  name: string;
  edition: string;
  theme: string;
  description: string;
  startDate: Date;
  endDate: Date;
  coverImage?: string;
  isCurrentOrNext: boolean;
  highlights: string[];
  createdAt: Date;
  updatedAt: Date;
}

const FestSchema = new Schema<IFest>(
  {
    name: { type: String, required: true },
    edition: { type: String, required: true },
    theme: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    coverImage: { type: String },
    isCurrentOrNext: { type: Boolean, default: false },
    highlights: [{ type: String }],
  },
  { timestamps: true }
);

export const Fest: Model<IFest> =
  mongoose.models.Fest || mongoose.model<IFest>("Fest", FestSchema);
