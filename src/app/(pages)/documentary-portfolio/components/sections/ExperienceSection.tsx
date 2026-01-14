"use client";
import type { GalleryImage } from "../../imageList";

interface Props {
  data: GalleryImage;
}

const EXPERIENCES = [
  {
    organization: "Hindustan Times",
    role: "Senior Visual Producer",
    description: "Played a role in significantly enhancing the visual impact of the nation's leading daily newspaper. Responsibilities included the meticulous acquisition, curation and enhancement of visual content for both print and digital editorial content at the national editorial desk. This encompassed the critical task of gathering and interpreting data, information, and content within a fast-paced global digital environment to ensure the availability of the most impactful visuals. Archived news photographs, preserving invaluable historical moments for future reference. Collaborative efforts with global news agencies, photo departments, and  individual photographers involved the skillful application of digital techniques and tools to effectively represent visual information for compelling news articles. Anticipating roadblocks in formally acquiring factful visuals, I devised workarounds to ensure the continuous momentum of the workflow without the loss of quality and trustworthiness.",
    year: "2022",
    location: "New Delhi, Delhi"
  },
  {
    organization: "Indian Institute For Human Settlements (IIHS)",
    role: "URBAN PHOTOGRAPHER",
    description: "Established and enriched Bengaluru’s photographic database for the Indian Institute For Human Settlements (IIHS) through meticulous approaches and benchmarking, ensuring comprehensive coverage and accessibility, in alignment with in-house research.",
    year: "2021",
    location: "Bengaluru, Karnataka"
  },
  {
    organization: "Maharashtra Government",
    role: "DOCUMENTARY PHOTOGRAPHER",
    description: "Identified key metrics and effectively communicated the impact of the Village Social Transformation Mission on tribal and rural communities for the Maharashtra Government. Utilized the art of visual storytelling to vividly portray the missions far-reaching effects.",
    year: "2020",
    location: "Gadchiroli, Maharashtra"
  },
  {
    organization: "Paani Foundation",
    role: "DOCUMENTARY PHOTOGRAPHER",
    description: "Documented Paani Foundation's belief power of communication to mobilise, motivate and train people in a mission to eradicate drought in Maharashtra; Traveled throughout the drought-hit state to photograph the training centers, participants and impact stories.",
    year: "2019",
    location: "Beed, Maharashtra"
  },
  {
    organization: "The Wire",
    role: "REPORTER",
    description: "Dedicated reporting for The Wire entailed extensive field visits in rural India and the analysis of complex social issues. This task demanded an unwavering commitment to in-depth research, social justice and storytelling, supporting editorial needs while ensuring alignment with stakeholders' perspectives and needs.",
    year: "2018",
    location: "Ahmedabad, Gujarat"
  },
  {
    organization: "Photojournalists Sudharak Olwe & Helena Schaetzle",
    role: "RESEARCH ASSISTANT",
    description: "Researched and wrote for photo-stories; Assisted as a writer and a videographer on documentation of atrocity cases against Dalits in Gujarat; Created and managed visual content in general, including promotional material and social media content; Created newsletters and wrote proposals for exhibitions, projects and grants.",
    year: "2018",
    location: "Guhagar, Maharashtra"
  }
];

export function ExperienceSection({ data }: Props) {
  return (
    <div className="space-y-2 max-h-[60vh] overflow-y-auto overflow-x-hidden scroll-smooth font-rajdhani pr-1 antialiased">
      <button className="button-style relative z-10 font-medium text-xs tracking-[0.2em] uppercase p-1 pointer-events-auto">
        Selected Experiences
      </button>

      <div className="space-y-1.5 pb-4">
        {EXPERIENCES.map((exp, index) => (
          <article key={index} className="space-y-4 group relative">
            <div className="relative hover:card-shadow p-3 rounded-sm transition-all duration-300">
              <div className="space-y-1">
              <h4 className="text-[--primary-blue] font-bold text-md leading-tight transition-all duration-300">
                {exp.organization}
              </h4>
              <p className="text-[--primary-blue]/90 font-bold text-[10px] tracking-[0.15em] uppercase">
                {exp.role}
              </p>
            </div>
              <p className="text-[--primary-blue] text-[15px] leading-relaxed font-light text-left">
                {exp.description}
              </p>
              <footer className="flex justify-between items-center text-[10px] text-[--primary-blue]/70 border-t border-[--primary-blue]/20 pt-3 mt-3">
              <span className="tracking-widest uppercase font-semibold">{exp.year}</span>
              <span className="uppercase tracking-widest font-semibold">{exp.location}</span>
            </footer>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
