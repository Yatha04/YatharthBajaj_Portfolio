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
            I'm a passionate software developer and engineering student with experience in AI, automation, and healthcare technology.
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
    </DarkModeProvider>
  )
}

export default App