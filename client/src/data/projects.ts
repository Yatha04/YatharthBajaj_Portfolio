export interface Project {
  id: string;
  title: string;
  description: string[];
  tech: string[];
  github?: string;
  date?: string;
}

export const projects: Project[] = [
  {
    id: 'Grassroots',
    title: 'Grassroots',
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
    date: 'November 2025',
    description: [
      'Connecting Strava data, room light controls, and more to the Poke (Interaction Company) Agent through MCP.',
    ],
    tech: ['Python', 'MCP'],
  },
  {
    id: 'Rash Driving AI',
    title: 'Rash Driving AI',
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
    date: 'December 2024',
    description: [
      'Built a robotic arm with actuators, motors, and a camera for object recognition and manipulation',
      'Programmed the system to perform tasks like picking objects, playing games and more',
    ],
    tech: ['Robotics', 'Python', 'Computer Vision', 'Actuators'],
  },
  {
    id: 'Precision MMA Website',
    title: 'Precision MMA Website',
    date: 'June 2025',
    description: [  
      'A website for a martial arts academy, available on GitHub',
    ],
    tech: ['React', 'TypeScript', 'TailwindCSS'],
    github: 'https://github.com/Yatha04/Precision_MMA',
  }
]; 