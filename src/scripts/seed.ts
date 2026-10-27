import { connectDB } from "../lib/db";
import { Society } from "../models/Society";
import { Fest } from "../models/Fest";
import { initialSocieties, initialFests } from "../lib/seedData";

async function runSeed() {
  console.log("Connecting to MongoDB...");
  try {
    await connectDB();
    console.log("Connected successfully.");

    console.log("Seeding Societies...");
    for (const societyData of initialSocieties) {
      await Society.findOneAndUpdate(
        { slug: societyData.slug },
        societyData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`- Upserted society: ${societyData.name}`);
    }

    console.log("Seeding Fests...");
    for (const festData of initialFests) {
      await Fest.findOneAndUpdate(
        { name: festData.name, edition: festData.edition },
        festData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`- Upserted fest: ${festData.name} (${festData.edition})`);
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error running seed:", error);
    process.exit(1);
  }
}

runSeed();
