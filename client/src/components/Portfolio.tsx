import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Experience } from './Experience'
import { ProjectsGrid } from './ProjectCarousel'
import { InteractiveSkills } from './InteractiveSkills'
import FancyLink from './FancyLink'
import { ParticleText } from './ParticleText'
import { MobileHero } from './MobileHero'
import { AnimatedBackground } from './AnimatedBackground'
import { useIsMobile } from '../hooks/useIsMobile'

export function Portfolio() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [lastClickTime, setLastClickTime] = useState(0)
  const [showCopied, setShowCopied] = useState(false)
  const DOUBLE_CLICK_DELAY = 500 // ms

  const subtitleWords = ['exploring new places.', 'building.', 'taking pictures.', 'listening to music.', 'playing video games.', 'watching movies and TV shows.', 'playing soccer.']

  const skills = [
    "Languages: Python, JavaScript, TypeScript, C++, SQL, HTML, CSS",
    "Web Frameworks: React, Next.js, Node.js, FastAPI",
    "AI/ML/DL: PyTorch, TensorFlow, Scikit-learn, Hugging Face Transformers, OpenCV",
    "Cloud: AWS (EC2, S3, Lambda, DynamoDB), Azure, Google Cloud Platform",
    "Databases: PostgreSQL, MySQL",
    "Tools & Technologies: Docker, Git, GitHub, CI/CD, REST APIs, GraphQL",
    "Other: Agile Methodologies, Data Structures & Algorithms, Object-Oriented Programming"
  ];

  const handleNameClick = () => {
    const now = Date.now()
    if (now - lastClickTime < DOUBLE_CLICK_DELAY) {
      // Double click detected
      navigate('/videos')
    } else {
      setLastClickTime(now)
    }
  }

  return (
    <div className="pb-20 md:pb-32">
      <AnimatedBackground />
      <Navbar />

      {/* Home Section */}
      <div id="home" className="relative z-10 h-dvh">
        {isMobile ? (
          <MobileHero
            name="Yatharth Bajaj"
            subtitlePrefix="I love "
            subtitleWords={subtitleWords}
            onClick={handleNameClick}
          />
        ) : (
          <ParticleText
            text="Yatharth Bajaj"
            subtitlePrefix="I love "
            subtitleWords={subtitleWords}
            className="absolute inset-0 w-full h-full cursor-pointer select-none"
            onClick={handleNameClick}
          />
        )}
      </div>

      {/* About Section */}
      <div id="about" className="flex items-center justify-center py-6 md:py-8 px-4 relative z-10">
        <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Studying <a href="https://www.uc.edu/" target="_blank" rel="noopener noreferrer"><i>Computer Science & Math.</i></a>
            <br />Interning as a <i>Controls Engineer</i> <a href="https://jtekt-na.com/" target="_blank" rel="noopener noreferrer">@JTEKT NA</a>.
            <br />
            I've been trying to get into <i>Machine Learning</i> and build some cool projects.

          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8">
            <FancyLink
              href="https://x.com/YatharthBajaj4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 text-base md:text-lg"
            >
              X
            </FancyLink>
            <FancyLink
              href="https://www.linkedin.com/in/yatharth-bajaj/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 text-base md:text-lg"
            >
              LinkedIn
            </FancyLink>
            <FancyLink
              href="https://github.com/Yatha04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 text-base md:text-lg"
            >
              GitHub
            </FancyLink>
            <FancyLink
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 text-base md:text-lg"
            >
              Resume
            </FancyLink>
            <div className="relative flex flex-col items-center justify-center">
              <FancyLink
                href="mailto:bajajyh@mail.uc.edu"
                className="text-gray-700 dark:text-gray-300 text-base md:text-lg"
                onClick={() => {
                  navigator.clipboard.writeText('bajajyh@mail.uc.edu')
                  setShowCopied(true)
                  setTimeout(() => setShowCopied(false), 2000)
                }}
              >
                Email
              </FancyLink>
              <div
                className={`absolute -bottom-10 whitespace-nowrap px-2.5 py-1 bg-black/10 text-gray-900 dark:bg-black/20 dark:text-white border border-black/20 dark:border-black/20 rounded-md text-xs font-semibold transition-all duration-300 pointer-events-none flex items-center gap-1.5 backdrop-blur-sm shadow-sm ${showCopied ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-1 scale-95'}`}
              >
                <span className="text-xs"></span> Copied to clipboard!
              </div>
            </div>
            <FancyLink
              href="/honors"
              className="text-gray-700 dark:text-gray-300 text-base md:text-lg"
            >
              Honors Portfolio
            </FancyLink>
            <FancyLink
              href="/blog"
              className="text-gray-700 dark:text-gray-300 text-base md:text-lg"
            >
              Blog
            </FancyLink>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div id="work"><Experience /></div>

      {/* Projects Section */}
      <div id="projects"><ProjectsGrid /></div>

      {/* Skills Section */}
      <div id="menu" className="flex flex-col items-center justify-center py-6 md:py-8 px-4 relative z-10">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
          My Skills
        </h2>
        <InteractiveSkills skills={skills} />
      </div>
    </div>
  )
}
