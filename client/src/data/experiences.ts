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
    id: 'JTEKT',
    company: 'JTEKT North America',
    role: 'Controls Engineer Co-op',
    location: 'Greenville, SC',
    locationType: 'On Site',
    duration: 'Jan 2026 - Present',
    description: '',
    achievements: [
      'Programmed a Pick and Place machine for a new part type', 'Experimenting with ML pipelines for industrial quality prediction using real PLC data and gradient boosting models', 'Helped deliver machines with 99% Chokko (Good parts VS Bad parts)'
    ],
    tags: ['PLC Programming', 'ML', 'Manufacturing'],
    isHighlighted: false,
    externalLink: 'https://jtekt.com',
    logo: 'jtekt.png'
  },
  {
    id: 'The Detail AI',
    company: 'The Detail AI',
    role: 'Software Developer Intern',
    location: 'Cincinnati',
    locationType: 'Remote',
    duration: 'Sep 2025 - Dec 2025',
    description: 'Worked on HeyJulia, an AI-voice assistant that captures data about your Construction project and delivers live insights.',
    achievements: [
      'Developed the Demo Agent for HeyJulia, which helps in customer onboarding and delivers a sample of what you can expect from the product.'],
    tags: ['Python', 'Docker', 'Google Cloud', 'LLMs', 'PostreSQl', 'React', 'FastAPI'],
    isHighlighted: false,
    externalLink: 'https://thedetail.ai/'
  },
  {
    id: 'sprite-health',
    company: 'Sprite Health',
    role: 'Software Developer Co-Op',
    location: 'Texas',
    locationType: 'Remote',
    duration: 'May 2025 – Aug 2025',
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
    company: 'JTEKT North America',
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
    duration: 'May 2023 – Dec 2025',
    description: 'Provided administrative support and academic tutoring services to university students.',
    achievements: [
      'Managed front-desk operations, provided administrative support for a dorm of 1000+ students',
      'Conducted 100+ 1-1 tutoring sessions in Math, Physics, Chemistry, CS, Engineering Design, Study habits, Time Management'
    ],
    tags: ['Student Services', 'Tutoring', 'Administration', 'Education'],
    externalLink: 'https://uc.edu',
    logo: 'uc.png'
  }
];

export const education = {
  institution: 'University of Cincinnati',
  degree: 'Class of 2027',
  major: 'Computer Science',
  gpa: '3.87/4.00',
  location: 'Cincinnati, Ohio'
};