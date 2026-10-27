import { connectDB } from "./db";
import { Society, ISociety } from "../models/Society";
import { initialSocieties } from "./seedData";

export async function getAllSocieties(): Promise<ISociety[] | typeof initialSocieties> {
  try {
    await connectDB();
    const societies = await Society.find({}).sort({ order: 1 }).lean();
    if (societies && societies.length > 0) {
      return societies as unknown as ISociety[];
    }
  } catch (error) {
    console.warn("MongoDB connection unavailable or empty; falling back to initial societies dataset.", error);
  }
  return initialSocieties;
}

export async function getSocietyBySlug(slug: string) {
  try {
    await connectDB();
    const society = await Society.findOne({ slug }).lean();
    if (society) {
      return society;
    }
  } catch (error) {
    console.warn(`MongoDB lookup failed for slug ${slug}; falling back to initial data.`, error);
  }
  return initialSocieties.find((s) => s.slug === slug) || null;
}
