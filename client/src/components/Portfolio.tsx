import { Navbar } from './Navbar'
import { Typewriter } from './Typewriter'
import { Experience } from './Experience'
import { ProjectsGrid } from './ProjectCarousel'
import { InteractiveSkills } from './InteractiveSkills'
import { Button } from './ui/button'
import { Linkedin, Github, Instagram, Mail, FileText, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Portfolio() {
  const navigate = useNavigate()

  const skills = [
    "Languages: Python, JavaScript, TypeScript, C++, SQL, HTML, CSS",
    "Web Frameworks: React, Next.js, Node.js, bFastAPI",
    "AI/ML/DL: PyTorch, TensorFlow, Scikit-learn, Hugging Face Transformers, OpenCV",
    "Cloud: AWS (EC2, S3, Lambda, DynamoDB), Azure, Google Cloud Platform",
    "Databases: PostgreSQL, MySQL",
    "Tools & Technologies: Docker, Git, GitHub, CI/CD, REST APIs, GraphQL",
    "Other: Agile Methodologies, Data Structures & Algorithms, Object-Oriented Programming, Microservices, Serverless Architecture"
  ];

  return (
    <>
      <Navbar />
      
      {/* Home Section */}
      <div id="home" className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            Yatharth Bajaj
          </h1>
          <div className="text-2xl text-gray-700 dark:text-gray-300">
            I love <Typewriter words={['travelling.', 'AI.', 'photography.', 'coding.', 'learning.', 'music.']} />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="flex items-center justify-center py-8 px-4 relative z-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            I'm Yatharth Bajaj, a third-year Computer Science major at the University of Cincinnati with a strong interest in technology, travel, music, and photography. Recently, I've been exploring the world of artificial intelligence and am genuinely fascinated by its rapid progress—sometimes I think AI is advancing faster than my coffee can keep up. I'm eager to learn more, contribute to the field, and connect with others who share similar interests. Feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('/resume-viewer.html', '_blank')}
              className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-gray-200 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60"
            >
              <FileText className="w-5 h-5" />
              View Resume
            </Button>
            <Button 
              variant="default" 
              size="lg"
              onClick={() => navigate('/explore')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Explore More
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div id="work"><Experience /></div>

      {/* Projects Section */}
      <div id="projects"><ProjectsGrid /></div>

      {/* Skills Section */}
      <div id="menu" className="flex flex-col items-center justify-center py-8 px-4 relative z-10">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          My Skills
        </h2>
        <InteractiveSkills skills={skills} />
      </div>

      {/* Education Section */}
      <div id="education" className="flex flex-col items-center justify-center py-8 px-4 relative z-10">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Education</h2>
        <div className="w-full max-w-4xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-lg px-10 py-8 flex flex-col md:flex-row items-center md:items-start gap-8 border border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1 text-center md:text-left">
              Bachelor of Science – Computer Science
            </div>
            <div className="text-gray-700 dark:text-gray-300 mb-1 text-center md:text-left">
              University of Cincinnati, Cincinnati, Ohio
            </div>
            <div className="text-gray-700 dark:text-gray-300 mb-1 text-center md:text-left">
              University Honors Program | Dean's List Honors
            </div>
            <div className="text-gray-700 dark:text-gray-300 mb-1 text-center md:text-left">
              Int'l Outreach Award | UC Global Scholarship
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end min-w-[160px]">
            <div className="text-gray-700 dark:text-gray-300 mb-1 text-lg md:text-right">Class of 2027</div>
            <div className="text-gray-900 dark:text-white mb-1 md:text-right">GPA 3.84<span className='text-base font-normal'>/4.00</span></div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col items-center justify-center py-12 px-4 relative z-10">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Get In Touch</h2>
        <div className="flex items-center space-x-6">
          <a
            href="https://www.linkedin.com/in/yatharth-bajaj/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </a>
          <a
            href="https://github.com/Yatha04"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </a>
          <a
            href="https://www.instagram.com/yatha0408/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </a>
          <a
            href="mailto:bajajyh@mail.uc.edu"
            className="p-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200"
            aria-label="Email"
          >
            <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </a>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-6 text-center">
          Feel free to reach out and connect!
        </p>
      </div>
    </>
  )
} 