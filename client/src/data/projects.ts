export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string[];
  tech: string[];
  github?: string;
  date?: string;
}

export const projects: Project[] = [
  {
    id: 'LogixLens',
    title: 'LogixLens',
    tagline: 'PLC knowledge graph with RAG-powered troubleshooting',
    date: 'February 2026',
    description: [
      'Built a 9-stage parsing pipeline for PLC programs, constructing a Neo4j knowledge graph of tags, faults, and mapping',
      'Layered a RAG + LLM query interface over the graph, reducing troubleshooting time from hours to seconds',
    ],
    tech: ['Python', 'Neo4j', 'RAG', 'LLM'],
  },
  {
    id: 'Lumen',
    title: 'Lumen',
    tagline: 'VS Code extension for contextual code explanations',
    date: 'February 2026',
    description: [
      'VS Code extension that auto-detects code diffs and generates contextual, multi-depth explanations in the sidebar',
      'Powered by an LLM pipeline for intelligent code understanding',
    ],
    tech: ['TypeScript', 'VS Code API', 'LLM'],
    github: 'https://github.com/Yatha04/Lumen',
  },
  {
    id: 'CrossPlay',
    title: 'CrossPlay',
    tagline: 'Two-way Spotify ↔ YouTube Music playlist sync service',
    date: 'April 2026',
    description: [
      'Built a two-way playlist sync service between Spotify and YouTube Music with a 5-step fuzzy matching engine and 3-step verification for cross-platform song resolution',
      'Developed background daemon sync, one-off runs, and public playlist migration via a CLI, backed by 206 automated tests',
    ],
    tech: ['Python', 'FastAPI', 'SQLite', 'APScheduler'],
    github: 'https://github.com/Yatha04/CrossPlay',
  },
  {
    id: 'Grassroots',
    title: 'Grassroots',
    tagline: 'AI-powered phone banking training platform',
    date: 'October 2025',
    description: [
      'A comprehensive training platform that combines realistic voter simulations with advanced performance analytics to help political volunteers excel at phone banking. ',
    ],
    tech: ['React', 'TypeScript', 'TailwindCSS'],
    github: 'https://github.com/Yatha04/CalHacks',
  },
  {
    id: 'Poke MCP',
    title: 'Poke MCP',
    tagline: 'Connecting Strava, smart lights, and more to Poke Agent',
    date: 'November 2025',
    description: [
      'Connecting Strava data, room light controls, and more to the Poke (Interaction Company) Agent through MCP.',
    ],
    tech: ['Python', 'MCP'],
  },
  {
    id: 'Rash Driving AI',
    title: 'Rash Driving AI',
    tagline: 'Computer-vision pipeline for detecting rash driving',
    date: 'June 2025',
    description: [
      'Developed a computer-vision pipeline using OpenCV & YOLOv5 to detect rash driving behaviors in traffic',
      'Implemented automated alerting and dashboard visualization for incident tracking and trend monitoring',
    ],
    tech: ['OpenCV', 'YOLOv5', 'Python', 'Dashboard'],
    github: 'https://github.com/Yatha04/DriveDetection',
  },
  {
    id: 'Robotic Arm',
    title: 'Robotic Arm',
    tagline: 'Object recognition and manipulation with a custom robotic arm',
    date: 'December 2024',
    description: [
      'Built a robotic arm with actuators, motors, and a camera for object recognition and manipulation',
      'Programmed the system to perform tasks like picking objects, playing games and more',
    ],
    tech: ['Robotics', 'Python', 'Computer Vision', 'Actuators'],
  },
]; 