export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  locationType: 'On Site' | 'Remote' | 'Hybrid';
  duration: string;
  description: string;
  achievements: string[];
  tags: string[];
  isHighlighted?: boolean;
  externalLink?: string;
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: 'sprite-health',
    company: 'Sprite Health',
    role: 'Software Developer Co-Op',
    location: 'Texas',
    locationType: 'On Site',
    duration: 'May 2025 – Present',
    description: 'Working on healthcare technology solutions with focus on automation and data processing.',
    achievements: [
      'Implemented an automated file-monitoring pipeline leveraging scheduled data queries and pattern-detection algorithms, boosting issue detection from 0% to 90% within 1 hour',
      'Architected a unified metadata logging & notification system using Python, Google-Cloud for all file transactions',
      'Created an RPA-driven process for portal file transfers across 20+ partners'
    ],
    tags: ['Python', 'Google Cloud', 'RPA', 'Automation', 'Healthcare Tech'],
    isHighlighted: false,
    externalLink: 'https://spritehealth.com',
    logo: 'spriteHealth.png'
  },
  {
    id: 'jtekt',
    company: 'JTEKT North America Corporation',
    role: 'Controls Engineer Co-Op',
    location: 'South Carolina',
    locationType: 'On Site',
    duration: 'Jan 2024 – Dec 2024',
    description: 'Developed automation systems and AI-powered solutions for manufacturing processes.',
    achievements: [
      'Designed and programmed an automated prototype, helped securing a new customer and product',
      'Developed AI-powered scratch detection, laser-marking, robot bin-pick systems to enhance automation',
      'Set-up, debugged, and optimized electrical systems and manufacturing equipment for improved efficiency'
    ],
    tags: ['AI', 'Automation', 'Manufacturing', 'Controls Engineering', 'Prototyping'],
    externalLink: 'https://jtekt.com',
    logo: 'jtekt.png'
  },
  {
    id: 'uc-cincinnati',
    company: 'University of Cincinnati',
    role: 'Front Desk Assistant, Peer Tutor',
    location: 'Cincinnati',
    locationType: 'On Site',
    duration: 'May 2023 – April 2025',
    description: 'Provided administrative support and academic tutoring services to university students.',
    achievements: [
      'Managed front-desk operations, provided administrative support for a dorm of 1000+ students',
      'Conducted 100+ 1-1 tutoring sessions in Math, Physics, Chemistry, CS, Engineering Design'
    ],
    tags: ['Student Services', 'Tutoring', 'Administration', 'Education'],
    externalLink: 'https://uc.edu',
    logo: 'uc.png'
  },
  {
    id: 'swiggy-bundl',
    company: 'Swiggy-Bundl Technologies Pvt Ltd',
    role: 'Software Developer Intern',
    location: 'India',
    locationType: 'Remote',
    duration: 'Jun 2023 – Aug 2023',
    description: 'Worked on UI/UX optimization and gained exposure to modern development practices.',
    achievements: [
      'Optimized UI/UX for 10+ app components with Figma, JavaScript, HTML, and CSS',
      'Gained exposure to Cloud Computing and Docker Engine, broadening insights into modern practice'
    ],
    tags: ['UI/UX', 'Figma', 'JavaScript', 'HTML/CSS', 'Cloud Computing', 'Docker'],
    externalLink: 'https://swiggy.com',
    logo: 'swiggy.png'
  }
];

export const education = {
  institution: 'University of Cincinnati',
  degree: 'Class of 2027',
  gpa: '3.84/4.00',
  location: 'Cincinnati, Ohio',
  externalLink: 'https://uc.edu'
}; 