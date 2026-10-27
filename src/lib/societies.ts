import { connectDB } from "./db";
import { Society, ISociety } from "../models/Society";
import { Event, IEvent } from "../models/Event";
import { Fest, IFest } from "../models/Fest";
import { initialSocieties, initialEvents, initialFests } from "./seedData";

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

export async function getAllEvents() {
  try {
    await connectDB();
    const events = await Event.find({}).populate("society").sort({ date: 1 }).lean();
    if (events && events.length > 0) {
      return events;
    }
  } catch (error) {
    console.warn("MongoDB events lookup fallback to initial events.", error);
  }
  return initialEvents;
}

export async function getEventsBySocietySlug(societySlug: string) {
  const all = await getAllEvents();
  return all.filter((e: any) => {
    if (e.societySlug) return e.societySlug === societySlug;
    if (e.society?.slug) return e.society.slug === societySlug;
    return false;
  });
}

export async function getAllFests() {
  try {
    await connectDB();
    const fests = await Fest.find({}).sort({ startDate: -1 }).lean();
    if (fests && fests.length > 0) {
      return fests;
    }
  } catch (error) {
    console.warn("MongoDB fests lookup fallback to initial fests.", error);
  }
  return initialFests;
}
