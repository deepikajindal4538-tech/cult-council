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
