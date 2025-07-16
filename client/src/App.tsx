import { DarkModeProvider } from './context/DarkModeContext'
import { Navbar } from './components/Navbar'
import { Typewriter } from './components/Typewriter'
import { Experience } from './components/Experience'
import { ProjectsGrid } from './components/ProjectCarousel'
import { InteractiveSkills } from './components/InteractiveSkills'
import { Button } from './components/ui/button'
import { Linkedin, Github, Instagram, Mail, FileText, ArrowRight } from 'lucide-react'

function App() {

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
    <DarkModeProvider>
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
              onClick={() => {
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                  newWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <title>More About Yatharth</title>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <script src="https://cdn.tailwindcss.com"></script>
                        <script>
                          tailwind.config = {
                            darkMode: 'class',
                            theme: {
                              extend: {
                                colors: {
                                  background: 'hsl(var(--background))',
                                  foreground: 'hsl(var(--foreground))',
                                }
                              }
                            }
                          }
                        </script>
                      </head>
                      <body class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                        <div class="container mx-auto px-4 py-8">
                          <div class="mb-8">
                            <button onclick="window.close()" class="mb-4 px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                              ← Back to Portfolio
                            </button>
                            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                              More About Yatharth
                            </h1>
                          </div>
                          
                          <div class="grid md:grid-cols-2 gap-8">
                            <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Personal Background</h2>
                              <div class="space-y-4 text-gray-700 dark:text-gray-300">
                                <p>Born and raised in India, I moved to the United States to pursue my passion for technology and innovation. My journey from a small town to studying at a prestigious university has taught me the value of perseverance and the importance of embracing new challenges.</p>
                                <p>When I'm not coding or studying, you'll find me exploring new places, capturing moments through my camera lens, or discovering new music from around the world. I believe that diverse experiences fuel creativity and innovation.</p>
                              </div>
                            </div>
                            
                            <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Academic Journey</h2>
                              <div class="space-y-4">
                                <div class="flex items-start space-x-3">
                                  <div class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0">🎓</div>
                                  <div>
                                    <h3 class="font-semibold text-gray-900 dark:text-white">University of Cincinnati</h3>
                                    <p class="text-gray-700 dark:text-gray-300">Computer Science, Class of 2027</p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">GPA: 3.84/4.00</p>
                                  </div>
                                </div>
                                <div class="flex items-start space-x-3">
                                  <div class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0">🏆</div>
                                  <div>
                                    <h3 class="font-semibold text-gray-900 dark:text-white">Honors & Awards</h3>
                                    <ul class="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                                      <li>• University Honors Program</li>
                                      <li>• Dean's List Honors</li>
                                      <li>• International Outreach Award</li>
                                      <li>• UC Global Scholarship</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Interests & Hobbies</h2>
                              <div class="space-y-4">
                                <div>
                                  <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Travel</h3>
                                  <p class="text-gray-700 dark:text-gray-300 text-sm">I love exploring new cultures, cuisines, and landscapes. Each journey teaches me something new about the world and myself.</p>
                                </div>
                                <div>
                                  <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Photography</h3>
                                  <p class="text-gray-700 dark:text-gray-300 text-sm">Capturing moments and telling stories through images. I enjoy both landscape and street photography.</p>
                                </div>
                                <div>
                                  <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Music</h3>
                                  <p class="text-gray-700 dark:text-gray-300 text-sm">From classical to contemporary, music is my constant companion during coding sessions and travels.</p>
                                </div>
                              </div>
                            </div>
                            
                            <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Future Goals</h2>
                              <div class="space-y-4 text-gray-700 dark:text-gray-300">
                                <p>I'm passionate about leveraging AI and machine learning to solve real-world problems. My goal is to contribute to innovative solutions that make a positive impact on society.</p>
                                <p>I aspire to work in environments that foster creativity, continuous learning, and collaboration. Whether it's in research, industry, or entrepreneurship, I want to push the boundaries of what's possible.</p>
                                <p>Long-term, I hope to mentor others and give back to the tech community that has given me so much.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div class="mt-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Let's Connect</h2>
                            <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                              <div class="flex items-center space-x-2">
                                <span class="w-5 h-5 text-blue-600">📧</span>
                                <span class="text-gray-700 dark:text-gray-300">bajajyh@mail.uc.edu</span>
                              </div>
                              <div class="flex items-center space-x-2">
                                <span class="w-5 h-5 text-blue-600">📍</span>
                                <span class="text-gray-700 dark:text-gray-300">Cincinnati, Ohio</span>
                              </div>
                              <div class="flex items-center space-x-2">
                                <span class="w-5 h-5 text-blue-600">🌐</span>
                                <span class="text-gray-700 dark:text-gray-300">Available for opportunities</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </body>
                    </html>
                  `);
                  newWindow.document.close();
                }
              }}
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
    </DarkModeProvider>
  )
}

export default App