import React from "react";
import {
  Landmark,
  Compass,
  Boxes,
  ClipboardCheck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileText,
} from "lucide-react";

interface WorkflowTier {
  step: string;
  phase: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  accentBg: string;
  points: {
    label: string;
    description: string;
  }[];
}

const workflowTiers: WorkflowTier[] = [
  {
    step: "01",
    phase: "TIER 01 // GOVERNANCE",
    title: "The Parliament",
    subtitle: "Democratic Evaluation",
    icon: Landmark,
    accentColor: "#92400E", // amber-800
    accentBg: "bg-amber-100/70 border-amber-300/80 text-amber-900",
    points: [
      {
        label: "Legislative Review",
        description:
          "Every proposed event begins as a bill presented before the full Cultural Council Parliament.",
      },
      {
        label: "Debate & Vote",
        description:
          "Council members, club representatives, and student leaders debate the event's merits, inclusivity, and relevance.",
      },
      {
        label: "Official Passing",
        description:
          "A majority vote is mandatory to officially greenlight the occurrence of any new event on the cultural calendar.",
      },
    ],
  },
  {
    step: "02",
    phase: "TIER 02 // STRATEGY",
    title: "Planning",
    subtitle: "Strategic Blueprinting",
    icon: Compass,
    accentColor: "#0D9488", // teal-700
    accentBg: "bg-teal-50 border-teal-200 text-teal-900",
    points: [
      {
        label: "Feasibility Mapping",
        description:
          "We outline the scope, target audience, and resource requirements for the approved event.",
      },
      {
        label: "Timeline Development",
        description:
          "Detailed milestones and deadlines are established to ensure realistic execution pathways.",
      },
      {
        label: "Risk Management",
        description:
          "Potential bottlenecks—ranging from logistical delays to venue constraints—are identified alongside mitigation strategies.",
      },
    ],
  },
  {
    step: "03",
    phase: "TIER 03 // OPERATIONS",
    title: "Organisation",
    subtitle: "Execution & Logistics",
    icon: Boxes,
    accentColor: "#B45309", // amber-700
    accentBg: "bg-amber-50 border-amber-200 text-amber-900",
    points: [
      {
        label: "Resource Allocation",
        description:
          "Disbursing inventory, booking venues, and securing technical equipment.",
      },
      {
        label: "Cross-Club Synergy",
        description:
          "Coordinating responsibilities between diverse cultural societies, volunteer teams, and external vendors.",
      },
      {
        label: "Public Relations",
        description:
          "Driving promotional campaigns, social media strategies, and ticketing or registration setups.",
      },
    ],
  },
  {
    step: "04",
    phase: "TIER 04 // COMPLIANCE",
    title: "Audit",
    subtitle: "Accountability & Compliance",
    icon: ClipboardCheck,
    accentColor: "#15803D", // green-700
    accentBg: "bg-emerald-50 border-emerald-200 text-emerald-900",
    points: [
      {
        label: "Financial Oversight",
        description:
          "Reconciling post-event expenses against the initial budget allocation to ensure complete transparency.",
      },
      {
        label: "Impact Assessment",
        description:
          "Gathering quantitative data (footfall, engagement metrics) and qualitative feedback from participants.",
      },
      {
        label: "Post-Mortem Review",
        description:
          "Documenting lessons learned to refine the blueprint for future cultural iterations.",
      },
    ],
  },
];

interface HowWeWorkSectionProps {
  className?: string;
  sectionNumber?: string;
}

export function HowWeWorkSection({
  className = "",
  sectionNumber = "02",
}: HowWeWorkSectionProps) {
  return (
    <section
      id="how-we-work"
      className={`py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none ${className}`}
    >
      {/* Header Ledger & Title Spread */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-stone-300 pb-10">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span>{sectionNumber} // OPERATIONAL BLUEPRINT</span>
            <span className="text-stone-400">//</span>
            <span className="text-stone-600">FOUR-TIER GOVERNANCE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.05]">
            How We Work:{" "}
            <span className="italic font-normal text-stone-600">
              From Vision to Stage
            </span>
          </h2>

          <p className="font-serif italic text-base sm:text-xl text-stone-700 leading-relaxed pt-1">
            The Cultural Council is the governing body responsible for shaping
            the vibrant cultural landscape of our campus. We ensure every
            initiative aligns with our community values, financial prudence, and
            creative standards through a structured, four-tier governance
            process.
          </p>
        </div>

        {/* Apex Regulatory Badge */}
        <div className="shrink-0 self-start md:self-end">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F4F1EA] border border-stone-300 font-mono text-xs uppercase tracking-wider text-ink shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>4-TIER STATUTORY LIFECYCLE</span>
          </div>
        </div>
      </div>

      {/* 4-Tier Governance Process Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workflowTiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.step}
              className="group relative bg-[#FAF8F5] rounded-2xl border border-stone-300 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-ink/70 transition-all duration-300"
            >
              <div>
                {/* Stage Header Indicator */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl sm:text-2xl font-black text-ink">
                      {tier.step}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-stone-300 text-stone-600 bg-white">
                      PHASE
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200/90 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4 text-ink" />
                  </div>
                </div>

                {/* Stage Title */}
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-ink leading-tight">
                    {tier.title}
                  </h3>
                  <div className="font-mono text-xs text-amber-800 font-semibold tracking-wider uppercase mt-1">
                    {tier.subtitle}
                  </div>
                </div>

                {/* Concrete Governance Bullet Points */}
                <div className="space-y-4">
                  {tier.points.map((pt, pIdx) => (
                    <div key={pIdx} className="space-y-1">
                      <div className="flex items-center gap-1.5 font-sans font-bold text-xs text-ink uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                        <span>{pt.label}</span>
                      </div>
                      <p className="text-xs text-ink-muted leading-relaxed pl-3 border-l border-stone-200">
                        {pt.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Status Bar */}
              <div className="pt-6 mt-6 border-t border-stone-200/80 flex items-center justify-between font-mono text-[10px] uppercase text-ink-faint">
                <span>STAGE {tier.step} // 04</span>
                <span className="text-amber-800 font-semibold">VERIFIED</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
