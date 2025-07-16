import { Button } from './ui/button'
import { ArrowLeft, Construction, Hammer, Wrench, Cog } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function ExploreMore() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="mb-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-gray-200 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          {/* Main construction icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Construction className="w-16 h-16 text-white" />
            </div>
            {/* Floating tools */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
              <Hammer className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce animation-delay-1000">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div className="absolute top-1/2 -right-8 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center animate-bounce animation-delay-2000">
              <Cog className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Under Construction
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl animate-fade-in animation-delay-300">
            🚧 This page is being built with love and attention to detail. 
            <br />
            Check back soon for something amazing!
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-md mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full animate-progress-bar"></div>
            </div>
          </div>

          
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes progress-bar {
          0% { width: 0%; }
          100% { width: 75%; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-progress-bar {
          animation: progress-bar 2s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  )
} 