export interface Project {
  id: string;
  title: string;
  description: string[];
  tech: string[];
  github?: string;
}

export const projects: Project[] = [
  {
    id: 'Rash Driving AI',
    title: 'Rash Driving AI',
    description: [
      'Developed a computer-vision pipeline using OpenCV & YOLOv5 to detect rash driving behaviors in traffic',
      'Implemented automated alerting and dashboard visualization for incident tracking and trend monitoring',
    ],
    tech: ['OpenCV', 'YOLOv5', 'Python', 'Dashboard'],
  },
  {
    id: 'Robotic Arm',
    title: 'Robotic Arm',
    description: [
      'Built a robotic arm with actuators, motors, and a camera for object recognition and manipulation',
      'Programmed the system to perform tasks like picking objects, playing games and more',
    ],
    tech: ['Robotics', 'Python', 'Computer Vision', 'Actuators'],
  },
  {
    id: 'Mini-Facebook',
    title: 'Mini-Facebook',
    description: [
      'Built a web app with user authentication, profile management, post interaction, and real-time chat',
      'Ensured security by using HTTPS, Hashing, Input validation, output sanitization and more',
    ],
    tech: ['React', 'Node.js', 'WebSockets', 'Security'],
  },
  {
    id: 'Precision MMA Website',
    title: 'Precision MMA Website',
    description: [  
      'A website for a martial arts academy, available on GitHub',
    ],
    tech: ['React', 'TypeScript', 'TailwindCSS'],
    github: 'https://github.com/Yatha04/Precision_MMA',
  },
  {
    id: 'Job Application Tracker',
    title: 'Job Application Tracker',
    description: [
      'A Python tool to automatically track job application emails from your Gmail inbox and extract structured information using Large Language Models (LLMs)',
      'Connects to your Gmail, fetches job application emails, and uses an LLM to extract key details like company, position, and date for easy tracking',
    ],
    tech: ['Python', 'Gmail API', 'LLM', 'OAuth2'],
    github: 'https://github.com/Yatha04/ApplicationTracker',
  },
  {
    id: 'cooking-something-cool',
    title: 'Cooking Something Cool',
    description: [
      'Coming soon'
    ],
    tech: [],
  },
]; 