import fs from "fs";
import path from "path";
import { councilRoster, CouncilPerson } from "./councilData";

export interface TimelineEvent {
  id: string;
  title: string;
  societySlug: string;
  societyName: string;
  category: "Music" | "Dramatics" | "Dance" | "Literature" | "Fine Arts" | "Media" | "Flagship Festival";
  type: "upcoming" | "flagship" | "workshop";
  date: string;
  weekday: string;
  month: string;
  day: string;
  year: string;
  time: string;
  venue: string;
  status: "UPCOMING" | "REGISTRATIONS OPEN" | "HEADLINE FESTIVAL" | "CONFIRMED STAGE";
  description: string;
  accentColor: string;
  passCode: string;
  gcalDate: string;
  highlights: string[];
  edition?: string;
}

export interface CountdownConfig {
  festivalName: string;
  edition: string;
  theme: string;
  targetDate: string; // ISO 8601 string e.g. "2027-02-18T00:00:00.000Z"
  headerTag: string;
  subtitleTag: string;
  enabled: boolean;
  announcementText?: string;
  registrationUrl?: string;
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const EVENTS_FILE = path.join(DATA_DIR, "admin-events.json");
const COUNTDOWN_FILE = path.join(DATA_DIR, "admin-countdown.json");
const COUNCIL_FILE = path.join(DATA_DIR, "admin-council.json");

// Default initial dataset
const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "evt-1",
    title: "Acoustic Sunset: Unplugged Vol. IV",
    societySlug: "virtuosi",
    societyName: "Virtuosi Collective",
    category: "Music",
    type: "upcoming",
    date: "Nov 14, 2026",
    weekday: "SATURDAY",
    month: "NOV",
    day: "14",
    year: "2026",
    time: "6:00 PM – 9:30 PM IST",
    venue: "Main Auditorium Lawns",
    status: "REGISTRATIONS OPEN",
    description: "An intimate twilight gathering of stripped-down acoustic sets, indie originals, percussion circles, and soulful melodies under campus lantern light.",
    accentColor: "#0D9488",
    passCode: "CC-VRT-2601",
    gcalDate: "20261114T123000Z/20261114T160000Z",
    highlights: ["Open Jam Session", "Unplugged Indie Duos", "Acoustic Stage Setups"],
  },
  {
    id: "evt-2",
    title: "Aakrosh: Annual Street Play Battle",
    societySlug: "rangtarangini",
    societyName: "Rangtarangini Dramatics",
    category: "Dramatics",
    type: "upcoming",
    date: "Nov 21, 2026",
    weekday: "SATURDAY",
    month: "NOV",
    day: "21",
    year: "2026",
    time: "4:30 PM – 8:00 PM IST",
    venue: "Main Gate Circle / OAT",
    status: "CONFIRMED STAGE",
    description: "Hard-hitting social drama, synchronized drum chants, and incisive political satire as hostel troupes clash in the Nukkad Natak circle.",
    accentColor: "#B91C1C",
    passCode: "CC-RNG-2602",
    gcalDate: "20261121T110000Z/20261121T143000Z",
    highlights: ["Nukkad Natak Clash", "Live Dhol Cadence", "Inter-Hostel Trophy"],
  },
  {
    id: "evt-3",
    title: "Monochrome & Shadows: Masterclass",
    societySlug: "ams",
    societyName: "Acoustics & Media Society",
    category: "Media",
    type: "workshop",
    date: "Nov 28, 2026",
    weekday: "SATURDAY",
    month: "NOV",
    day: "28",
    year: "2026",
    time: "3:00 PM – 6:00 PM IST",
    venue: "SAC Audio-Visual Lab",
    status: "REGISTRATIONS OPEN",
    description: "Hands-on cinematography masterclass covering dynamic histogram control, festival low-light capture, and documentary street framing.",
    accentColor: "#D97706",
    passCode: "CC-AMS-2603",
    gcalDate: "20261128T093000Z/20261128T123000Z",
    highlights: ["35mm Framing Rules", "Festival Lighting Rigs", "Raw Color Grading"],
  },
  {
    id: "evt-4",
    title: "Street Cypher: 1v1 All-Styles Battle",
    societySlug: "geneticx",
    societyName: "Geneticx Dance Crew",
    category: "Dance",
    type: "upcoming",
    date: "Dec 05, 2026",
    weekday: "SATURDAY",
    month: "DEC",
    day: "05",
    year: "2026",
    time: "7:00 PM – 10:30 PM IST",
    venue: "Open Air Theatre (OAT)",
    status: "REGISTRATIONS OPEN",
    description: "Dancers go head-to-head in popping, breaking, and contemporary hip-hop to live vinyl DJ beats with audience decibel meters deciding the victors.",
    accentColor: "#E11D48",
    passCode: "CC-GNX-2604",
    gcalDate: "20261205T133000Z/20261205T170000Z",
    highlights: ["1v1 Freestyle Bracket", "Live Vinyl Turntables", "Decibel Judging"],
  },
  {
    id: "evt-5",
    title: "Kavya Sandhya: Bilingual Mushaira",
    societySlug: "sarasva",
    societyName: "Sarasva Literary Society",
    category: "Literature",
    type: "upcoming",
    date: "Dec 12, 2026",
    weekday: "SATURDAY",
    month: "DEC",
    day: "12",
    year: "2026",
    time: "6:30 PM – 9:30 PM IST",
    venue: "Library Verandah",
    status: "UPCOMING",
    description: "Urdu ghazals, Hindi nazms, and English spoken word delivered under ambient courtyard lanterns over warm cardamom tea.",
    accentColor: "#4F46E5",
    passCode: "CC-SRS-2605",
    gcalDate: "20261212T130000Z/20261212T160000Z",
    highlights: ["Classical Urdu Ghazals", "Collegiate Slam Round", "Candlelit Recitals"],
  },
  {
    id: "evt-6",
    title: "Campus Canvas: 48-Hour Mural Marathon",
    societySlug: "nirmiti",
    societyName: "Nirmiti Fine Arts",
    category: "Fine Arts",
    type: "workshop",
    date: "Dec 19, 2026",
    weekday: "SATURDAY",
    month: "DEC",
    day: "19",
    year: "2026",
    time: "10:00 AM – Next Day 10:00 AM",
    venue: "SAC Exterior Brick Facade",
    status: "CONFIRMED STAGE",
    description: "Transforming institute brick walls into monumental multi-panel canvas installations commemorating 27 years of student artistic heritage.",
    accentColor: "#EA580C",
    passCode: "CC-NRM-2606",
    gcalDate: "20261219T043000Z/20261220T043000Z",
    highlights: ["Live Graffiti Murals", "Open Student Canvas", "Institute Archive Theme"],
  },
  {
    id: "evt-7",
    title: "Effervescence '27: Annual Cultural Festival",
    societySlug: "council",
    societyName: "Cultural Council & All 6 Societies",
    category: "Flagship Festival",
    type: "flagship",
    date: "Feb 18–21, 2027",
    weekday: "THU–SUN",
    month: "FEB",
    day: "18",
    year: "2027",
    time: "4-Day Monumental Spectacle",
    venue: "Main Football Grounds & Campus Amphitheatres",
    status: "HEADLINE FESTIVAL",
    description: "North India's premier collegiate cultural extravaganza. 4 days of celebrity pro-nights, 75+ intercollegiate battles, and 15,000+ festival footfall.",
    accentColor: "#D97706",
    edition: "Edition 22",
    passCode: "CC-EFF-2701",
    gcalDate: "20270218T033000Z/20270221T183000Z",
    highlights: ["Celebrity Pro-Night", "Battle of the Bands", "A'La Mode Fashion Night", "Footloose Dance Solo"],
  },
  {
    id: "evt-8",
    title: "Goonj '27: Annual Theatre Festival",
    societySlug: "rangtarangini",
    societyName: "Rangtarangini Dramatics",
    category: "Dramatics",
    type: "flagship",
    date: "Mar 14–16, 2027",
    weekday: "SUN–TUE",
    month: "MAR",
    day: "14",
    year: "2027",
    time: "5:00 PM – 10:00 PM IST",
    venue: "Main Institute Auditorium",
    status: "CONFIRMED STAGE",
    description: "A 3-day proscenium theatre festival showcasing full-length stage productions, mono-acts, and original scripts from colleges nationwide.",
    accentColor: "#B91C1C",
    edition: "Annual Gala",
    passCode: "CC-GNJ-2702",
    gcalDate: "20270314T113000Z/20270316T163000Z",
    highlights: ["Full-Length Stage Drama", "Mono-Act Monologues", "Original Scriptwriting"],
  },
];

const INITIAL_COUNTDOWN_CONFIG: CountdownConfig = {
  festivalName: "Effervescence '27",
  edition: "Edition 22",
  theme: "Echoes of Eternity",
  targetDate: "2027-02-18T00:00:00.000Z",
  headerTag: "COUNTDOWN TO FEBRUARY // ARENA STAGE",
  subtitleTag: "PRO-NIGHT IGNITION",
  enabled: true,
  announcementText: "Passes open December 2026 for 120+ nationwide collegiate contingents.",
  registrationUrl: "/fests",
};

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// -------------------------------------------------------------
// 1. EVENTS MANAGEMENT
// -------------------------------------------------------------
export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  ensureDataDirectory();
  try {
    if (fs.existsSync(EVENTS_FILE)) {
      const data = fs.readFileSync(EVENTS_FILE, "utf-8");
      return JSON.parse(data) as TimelineEvent[];
    }
  } catch (err) {
    console.error("Error reading admin-events.json:", err);
  }
  // Fallback & seed
  await saveTimelineEvents(INITIAL_TIMELINE_EVENTS);
  return INITIAL_TIMELINE_EVENTS;
}

export async function saveTimelineEvents(events: TimelineEvent[]): Promise<void> {
  ensureDataDirectory();
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), "utf-8");
}

export async function createTimelineEvent(eventData: Omit<TimelineEvent, "id">): Promise<TimelineEvent> {
  const events = await getTimelineEvents();
  const id = `evt-${Date.now()}`;
  const newEvent: TimelineEvent = {
    ...eventData,
    id,
  };
  events.push(newEvent);
  await saveTimelineEvents(events);
  return newEvent;
}

export async function updateTimelineEvent(id: string, updates: Partial<TimelineEvent>): Promise<TimelineEvent | null> {
  const events = await getTimelineEvents();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return null;
  events[index] = { ...events[index], ...updates };
  await saveTimelineEvents(events);
  return events[index];
}

export async function deleteTimelineEvent(id: string): Promise<boolean> {
  const events = await getTimelineEvents();
  const next = events.filter((e) => e.id !== id);
  if (next.length === events.length) return false;
  await saveTimelineEvents(next);
  return true;
}

export async function resetTimelineEvents(): Promise<TimelineEvent[]> {
  await saveTimelineEvents(INITIAL_TIMELINE_EVENTS);
  return INITIAL_TIMELINE_EVENTS;
}

// -------------------------------------------------------------
// 2. COUNTDOWN & EFFERVESCENCE MANAGEMENT
// -------------------------------------------------------------
export async function getCountdownConfig(): Promise<CountdownConfig> {
  ensureDataDirectory();
  try {
    if (fs.existsSync(COUNTDOWN_FILE)) {
      const data = fs.readFileSync(COUNTDOWN_FILE, "utf-8");
      return JSON.parse(data) as CountdownConfig;
    }
  } catch (err) {
    console.error("Error reading admin-countdown.json:", err);
  }
  await saveCountdownConfig(INITIAL_COUNTDOWN_CONFIG);
  return INITIAL_COUNTDOWN_CONFIG;
}

export async function saveCountdownConfig(config: CountdownConfig): Promise<void> {
  ensureDataDirectory();
  fs.writeFileSync(COUNTDOWN_FILE, JSON.stringify(config, null, 2), "utf-8");
}

export async function updateCountdownConfig(updates: Partial<CountdownConfig>): Promise<CountdownConfig> {
  const current = await getCountdownConfig();
  const updated: CountdownConfig = { ...current, ...updates };
  await saveCountdownConfig(updated);
  return updated;
}

// -------------------------------------------------------------
// 3. COUNCIL LEADERSHIP MANAGEMENT
// -------------------------------------------------------------
export async function getCouncilMembers(): Promise<CouncilPerson[]> {
  ensureDataDirectory();
  try {
    if (fs.existsSync(COUNCIL_FILE)) {
      const data = fs.readFileSync(COUNCIL_FILE, "utf-8");
      return JSON.parse(data) as CouncilPerson[];
    }
  } catch (err) {
    console.error("Error reading admin-council.json:", err);
  }
  await saveCouncilMembers(councilRoster);
  return councilRoster;
}

export async function saveCouncilMembers(members: CouncilPerson[]): Promise<void> {
  ensureDataDirectory();
  fs.writeFileSync(COUNCIL_FILE, JSON.stringify(members, null, 2), "utf-8");
}

export async function createCouncilMember(memberData: Omit<CouncilPerson, "id">): Promise<CouncilPerson> {
  const members = await getCouncilMembers();
  const id = `member-${Date.now()}`;
  const newMember: CouncilPerson = {
    ...memberData,
    id,
  };
  members.push(newMember);
  await saveCouncilMembers(members);
  return newMember;
}

export async function updateCouncilMember(id: string, updates: Partial<CouncilPerson>): Promise<CouncilPerson | null> {
  const members = await getCouncilMembers();
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return null;
  members[index] = { ...members[index], ...updates };
  await saveCouncilMembers(members);
  return members[index];
}

export async function deleteCouncilMember(id: string): Promise<boolean> {
  const members = await getCouncilMembers();
  const next = members.filter((m) => m.id !== id);
  if (next.length === members.length) return false;
  await saveCouncilMembers(next);
  return true;
}

export async function resetCouncilMembers(): Promise<CouncilPerson[]> {
  await saveCouncilMembers(councilRoster);
  return councilRoster;
}
