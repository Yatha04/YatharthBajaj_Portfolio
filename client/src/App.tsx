import { DarkModeProvider } from './context/DarkModeContext'
import { Navbar } from './components/Navbar'
import { Typewriter } from './components/Typewriter'
import { Experience } from './components/Experience'
import { ProjectsGrid } from './components/ProjectCarousel'
import { InteractiveSkills } from './components/InteractiveSkills'

function App() {

  const skills = [
    "Languages: Python, JavaScript, TypeScript, Java, C++, C, SQL, HTML, CSS",
    "Web Frameworks: React, Next.js, Node.js, Express.js, Flask, Django, FastAPI",
    "AI/ML/DL: PyTorch, TensorFlow, Keras, Scikit-learn, Hugging Face Transformers, OpenCV, NLTK, SpaCy",
    "Cloud: AWS (EC2, S3, Lambda, DynamoDB, SQS, SNS), Azure, Google Cloud Platform",
    "Databases: PostgreSQL, MySQL, MongoDB, Redis",
    "Tools & Technologies: Docker, Kubernetes, Git, GitHub, CI/CD, REST APIs, GraphQL, Kafka, RabbitMQ, Linux, Apache Spark, Hadoop",
    "Other: Agile Methodologies, Data Structures & Algorithms, Object-Oriented Programming, Microservices, Serverless Architecture"
  ];

  return (
    <DarkModeProvider>
      <Navbar />
      
      {/* Home Section */}
      <div id="home" className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            Yatharth Bajaj
          </h1>
          <div className="text-2xl text-gray-700 dark:text-gray-300">
            I love <Typewriter words={['travelling.', 'AI.', 'photography.', 'coding.', 'learning.']} />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="flex items-center justify-center py-8 px-4 relative z-10">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
            I'm Yatharth Bajaj, a third-year Computer Science major at the University of Cincinnati with a strong interest in technology, travel, music, and photography. Recently, I've been exploring the world of artificial intelligence and am genuinely fascinated by its rapid progress—sometimes I think AI is advancing faster than my coffee can keep up. I'm eager to learn more, contribute to the field, and connect with others who share similar interests. Feel free to reach out!
          </p>
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
              University Honors Program | Dean’s List Honors
            </div>
            <div className="text-gray-700 dark:text-gray-300 mb-1 text-center md:text-left">
              Int’l Outreach Award | UC Global Scholarship
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end min-w-[160px]">
            <div className="text-gray-700 dark:text-gray-300 mb-1 text-lg md:text-right">Class of 2027</div>
            <div className="text-gray-900 dark:text-white mb-1 md:text-right">GPA 3.84<span className='text-base font-normal'>/4.00</span></div>
          </div>
        </div>
      </div>
    </DarkModeProvider>
  )
}

export default App