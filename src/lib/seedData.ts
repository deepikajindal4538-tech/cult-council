export const initialSocieties = [
  {
    name: "Acoustics & Media Society",
    slug: "ams",
    category: "Photography & Cinematography",
    tagline: "Freezing fleeting moments into timeless frames.",
    description: "AMS is the visual storytelling backbone of IIIT Allahabad. Through lens craft, cinematics, drone coverage, and acoustic direction, AMS captures the soul of campus life and major college festivals.",
    accentColor: "#D97706", // Amber 600
    washColor: "rgba(254, 243, 199, 0.45)", // Warm amber wash
    order: 1,
    objectConfig: {
      type: "camera",
      imageUrl: "/objects/camera.png",
      fallbackColor: "#D97706",
    },
    socialLinks: {
      instagram: "https://instagram.com/ams_iiita",
      youtube: "https://youtube.com/@ams_iiita",
    },
    leads: [
      { name: "Aarav Sharma", role: "Society Head" },
      { name: "Pooja Mehta", role: "Cinematography Lead" },
    ],
    stats: {
      membersCount: 45,
      eventsPerYear: 14,
      foundedYear: 2005,
    },
  },
  {
    name: "Geneticx",
    slug: "geneticx",
    category: "Dance & Choreography",
    tagline: "Syncing heartbeats to electrifying rhythm.",
    description: "Geneticx embodies high-voltage energy, fluid footwork, and choreographic excellence spanning western hip-hop, contemporary, classical fusion, and street battles across national stages.",
    accentColor: "#E11D48", // Rose 600
    washColor: "rgba(255, 228, 230, 0.45)", // Energetic rose wash
    order: 2,
    objectConfig: {
      type: "discoball",
      imageUrl: "/objects/discoball.png",
      fallbackColor: "#E11D48",
    },
    socialLinks: {
      instagram: "https://instagram.com/geneticx_crew",
    },
    leads: [
      { name: "Rohan Nair", role: "Society Head" },
      { name: "Ananya Iyer", role: "Lead Choreographer" },
    ],
    stats: {
      membersCount: 60,
      eventsPerYear: 16,
      foundedYear: 2004,
    },
  },
  {
    name: "Sarasva",
    slug: "sarasva",
    category: "Literature & Debating",
    tagline: "Where ink meets thought and words ignite revolutions.",
    description: "Sarasva is the sanctuary of words, poetry, parliamentary debates, open-mics, and literary magazines. It nurtures critical thought and expressive verse across Hindi and English.",
    accentColor: "#4F46E5", // Indigo 600
    washColor: "rgba(238, 242, 255, 0.5)", // Parchment royal indigo wash
    order: 3,
    objectConfig: {
      type: "letter",
      imageUrl: "/objects/letter.png",
      fallbackColor: "#4F46E5",
      letterContent: "To the dreamers and the seekers: Here between quiet halls and starlit skies, we write not just stories, but the spirit of who we are becoming.",
    },
    socialLinks: {
      instagram: "https://instagram.com/sarasva_iiita",
    },
    leads: [
      { name: "Devansh Rastogi", role: "Society Head" },
      { name: "Kavya Saxena", role: "Editorial Lead" },
    ],
    stats: {
      membersCount: 40,
      eventsPerYear: 12,
      foundedYear: 2003,
    },
  },
  {
    name: "Nirmiti",
    slug: "nirmiti",
    category: "Fine Arts & Design",
    tagline: "Transforming empty canvases into vibrant realities.",
    description: "Nirmiti breathes color into IIIT Allahabad. From mega canvas installations and live graffiti to digital vector arts and fest thematic decor, Nirmiti crafts the visual ambiance of the institute.",
    accentColor: "#EA580C", // Orange 600
    washColor: "rgba(255, 237, 213, 0.45)", // Warm coral ochre wash
    order: 4,
    objectConfig: {
      type: "paintbrush",
      imageUrl: "/objects/paintbrush.png",
      fallbackColor: "#EA580C",
    },
    socialLinks: {
      instagram: "https://instagram.com/nirmiti_iiita",
    },
    leads: [
      { name: "Sanya Gupta", role: "Society Head" },
      { name: "Aditya Verma", role: "Creative Director" },
    ],
    stats: {
      membersCount: 38,
      eventsPerYear: 10,
      foundedYear: 2004,
    },
  },
  {
    name: "Rangtarangini",
    slug: "rangtarangini",
    category: "Dramatics & Street Play",
    tagline: "Living a thousand lives under the stage spotlight.",
    description: "Rangtarangini champions theatrical excellence through hard-hitting Nukkad Nataks (street plays), thought-provoking stage dramas, mono-acts, and cinematic scriptwriting.",
    accentColor: "#B91C1C", // Red 700
    washColor: "rgba(254, 226, 226, 0.45)", // Maroon drama wash
    order: 5,
    objectConfig: {
      type: "clapboard",
      imageUrl: "/objects/clapboard.png",
      fallbackColor: "#B91C1C",
    },
    socialLinks: {
      instagram: "https://instagram.com/rangtarangini_iiita",
    },
    leads: [
      { name: "Vikas Jha", role: "Society Head" },
      { name: "Tanvi Mathur", role: "Director of Productions" },
    ],
    stats: {
      membersCount: 52,
      eventsPerYear: 15,
      foundedYear: 2003,
    },
  },
  {
    name: "Virtuosi",
    slug: "virtuosi",
    category: "Music & Band Society",
    tagline: "Harmonies that resonate long after the chords fade.",
    description: "Virtuosi is the heartbeat of campus music. From unplugged acoustic nights and Indian classical ensembles to rock band face-offs, Virtuosi elevates every musical soul at IIIT Allahabad.",
    accentColor: "#0D9488", // Teal 600
    washColor: "rgba(204, 251, 241, 0.45)", // Teal vinyl wash
    order: 6,
    objectConfig: {
      type: "vinyldisc",
      imageUrl: "/objects/vinyldisc.png",
      fallbackColor: "#0D9488",
    },
    socialLinks: {
      instagram: "https://instagram.com/virtuosi_iiita",
      youtube: "https://youtube.com/@virtuosi_iiita",
    },
    leads: [
      { name: "Kunal Ghosh", role: "Society Head" },
      { name: "Meera Sen", role: "Vocal Arranger" },
    ],
    stats: {
      membersCount: 48,
      eventsPerYear: 18,
      foundedYear: 2002,
    },
  },
];

export const initialFests = [
  {
    name: "Effervescence",
    edition: "2026",
    theme: "Echoes of Eternity",
    description: "Effervescence is North India's premier annual cultural extravaganza hosted by IIIT Allahabad, drawing thousands of students across the country for 3 days of music, dance, art, literature, and celebrity pro-nights.",
    startDate: new Date("2026-10-15"),
    endDate: new Date("2026-10-18"),
    coverImage: "/fests/effervescence.jpg",
    isCurrentOrNext: true,
    highlights: ["Celebrity Pro-Night", "Battle of the Bands", "A'La Mode Fashion Night", "Footloose Dance Solo & Crew"],
  },
  {
    name: "Rangoli",
    edition: "2026",
    theme: "Heritage & Harmony",
    description: "The intra-college cultural festival celebrating Indian festive traditions, inter-batch competitions, folk performances, and cultural unity.",
    startDate: new Date("2026-03-20"),
    endDate: new Date("2026-03-22"),
    coverImage: "/fests/rangoli.jpg",
    isCurrentOrNext: false,
    highlights: ["Antakshari Showdown", "Traditional Runway", "Folk Dance Relay", "Campus Canvas Painting"],
  },
];

export const councilDetails = {
  name: "Cultural Council",
  institution: "Indian Institute of Information Technology Allahabad",
  established: 1999,
  tagline: "The Nexus of Creative Expression & Collegiate Artistry",
  mandate:
    "The Cultural Council of IIIT Allahabad is the central statutory body dedicated to fostering creative expression, theatrical disciplines, acoustic excellence, choreographic mastery, visual arts, and literary inquiry across the campus community.",
  officeLocation: "Student Activity Center (SAC), Ground Floor, Devghat, Jhalwa, Prayagraj 211015",
  contactEmail: "culturalcouncil@iiita.ac.in",
  facultyInCharge: {
    name: "Dr. Pragya Singh",
    designation: "Faculty In-Charge (Cultural Affairs)",
    department: "Department of Management & Humanities",
  },
  stats: {
    societiesCount: 6,
    annualEvents: 75,
    activePerformers: 320,
    festFootfall: "15,000+",
  },
  venues: [
    {
      name: "Main Auditorium",
      capacity: "1,000 Seats",
      type: "Acoustically Treated Proscenium Theatre",
      usage: "Dramatic productions, classical concerts, inauguration ceremonies, and pro-shows.",
    },
    {
      name: "Open Air Theatre (OAT)",
      capacity: "3,500 Capacity",
      type: "Greek-style Amphitheatre",
      usage: "Rock band battles, celebrity pro-nights, street dance clashes, and festive bonfires.",
    },
    {
      name: "Student Activity Center (SAC)",
      capacity: "Multi-Wing Facility",
      type: "Rehearsal & Creative Production Studios",
      usage: "Jam rooms, wooden dance floor, canvas art studio, and photography edit bays.",
    },
  ],
};

export const councilTeam = [
  {
    role: "President / Faculty In-Charge",
    name: "Dr. Pragya Singh",
    type: "Faculty",
    email: "pragya@iiita.ac.in",
    avatar: "PS",
  },
  {
    role: "General Secretary (Cultural)",
    name: "Aryan Deshmukh",
    type: "Student Executive",
    department: "B.Tech IT, 4th Year",
    email: "cultsec@iiita.ac.in",
    avatar: "AD",
  },
  {
    role: "Joint Secretary (Events & Logistics)",
    name: "Riya Kapoor",
    type: "Student Executive",
    department: "B.Tech ECE, 3rd Year",
    email: "riya.events@iiita.ac.in",
    avatar: "RK",
  },
  {
    role: "Joint Secretary (Media & Brand)",
    name: "Tushar Bansal",
    type: "Student Executive",
    department: "B.Tech IT, 3rd Year",
    email: "tushar.media@iiita.ac.in",
    avatar: "TB",
  },
  {
    role: "Treasurer & Sponsorship Coordinator",
    name: "Harshita Sengupta",
    type: "Student Executive",
    department: "B.Tech IT-BI, 3rd Year",
    email: "harshita.finance@iiita.ac.in",
    avatar: "HS",
  },
];

export const initialEvents = [
  {
    id: "evt-1",
    title: "Acoustic Sunset: Unplugged Vol. IV",
    societySlug: "virtuosi",
    societyName: "Virtuosi Music Collective",
    category: "Live Music",
    date: "November 14, 2026",
    time: "6:00 PM IST",
    venue: "Main Auditorium Lawns",
    status: "upcoming",
    description: "An intimate evening of indie melodies, stripped-down acoustics, and open jam circles under the twilight campus sky.",
  },
  {
    id: "evt-2",
    title: "Aakrosh: Annual Inter-Hostel Street Play Battle",
    societySlug: "rangtarangini",
    societyName: "Rangtarangini Theatre",
    category: "Dramatics",
    date: "November 21, 2026",
    time: "4:30 PM IST",
    venue: "Main Gate Circle / OAT",
    status: "upcoming",
    description: "Vibrant drums, chorus chanting, and incisive social narratives as hostel troupes compete in hard-hitting Nukkad Natak format.",
  },
  {
    id: "evt-3",
    title: "Monochrome & Shadows: Photography Masterclass",
    societySlug: "ams",
    societyName: "Acoustics & Media Society",
    category: "Visual Media",
    date: "November 28, 2026",
    time: "3:00 PM IST",
    venue: "SAC Audio-Visual Lab",
    status: "upcoming",
    description: "Hands-on workshop on framing, raw histogram control, and narrative framing in street documentary photography.",
  },
  {
    id: "evt-4",
    title: "Street Cypher: 1v1 All-Styles Dance Battle",
    societySlug: "geneticx",
    societyName: "Geneticx Crew",
    category: "Choreography",
    date: "December 05, 2026",
    time: "7:00 PM IST",
    venue: "Open Air Theatre (OAT)",
    status: "upcoming",
    description: "Dancers go head-to-head in popping, breaking, and hip-hop to live DJ beats with audience decibel judging.",
  },
  {
    id: "evt-5",
    title: "Kavya Sandhya: Bilingual Poetry & Open Mic",
    societySlug: "sarasva",
    societyName: "Sarasva Society",
    category: "Literature",
    date: "December 12, 2026",
    time: "6:30 PM IST",
    venue: "Library Verandah",
    status: "upcoming",
    description: "Spoken word, Urdu ghazals, English free-verse, and campus reflections recited over warm tea and ambient lamps.",
  },
  {
    id: "evt-6",
    title: "Campus Canvas: Live 48-Hour Mural Marathon",
    societySlug: "nirmiti",
    societyName: "Nirmiti Arts",
    category: "Fine Arts",
    date: "December 19, 2026",
    time: "10:00 AM IST",
    venue: "SAC Exterior Wall",
    status: "upcoming",
    description: "Transforming blank institute brick walls into a collaborative visual journey commemorating 27 years of student creativity.",
  },
];
