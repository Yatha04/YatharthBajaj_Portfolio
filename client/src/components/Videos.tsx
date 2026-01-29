import React from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { ArrowLeft, Play, Youtube } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { videos, Video } from '../data/videos'

// Utility function to extract YouTube video ID from URL
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}

// Utility function to get YouTube thumbnail URL
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

interface VideoCardProps {
  video: Video
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const videoId = extractYouTubeId(video.youtubeUrl)
  const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : null

  const categoryColors: Record<string, string> = {
    'vlog': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'side-project': 'bg-green-500/20 text-green-400 border-green-500/30',
    'other': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  }

  const categoryColor = categoryColors[video.category] || categoryColors['other']

  return (
    <a
      href={video.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative w-full rounded-lg overflow-hidden transition-all duration-150 ease-in-out group z-50 backdrop-blur-md bg-card/50 dark:bg-card/30 border border-border/50 hover:border-border"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F2F2F2] to-[#D9D9D9] dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-50 transition-opacity duration-150 ease-in-out rounded-lg backdrop-blur-md z-10"></div>
      
      {/* Glow effect on hover */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-400/10 dark:bg-green-400/5 rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10"></div>

      {/* Thumbnail */}
      {thumbnailUrl && (
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to hqdefault if maxresdefault fails
              const target = e.target as HTMLImageElement
              const fallbackId = extractYouTubeId(video.youtubeUrl)
              if (fallbackId) {
                target.src = `https://img.youtube.com/vi/${fallbackId}/hqdefault.jpg`
              }
            }}
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-150 z-20">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          </div>
          {/* YouTube branding */}
          <div className="absolute top-2 right-2 bg-black/70 rounded px-2 py-1 flex items-center gap-1 z-20">
            <Youtube className="w-4 h-4 text-white" />
            <span className="text-xs text-white font-medium">YouTube</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative p-4 flex flex-col gap-2 z-10">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-accent-foreground text-base flex-1">{video.title}</h3>
          <Badge className={`text-xs ${categoryColor} border`}>
            {video.category}
          </Badge>
        </div>
        {video.date && (
          <p className="font-medium text-muted-foreground text-sm">{video.date}</p>
        )}
        <p className="font-medium text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {video.description}
        </p>
      </div>
    </a>
  )
}

export function Videos() {
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
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-gray-200 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-6xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Behind the Scenes
          </motion.h1>

          {/* Description Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <Card className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-gray-200 dark:border-gray-700 shadow-lg p-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                A collection of vlogs, side projects, and moments from my journey. Here's where I share the real stories behind the code, the adventures, and everything in between.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Video Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </motion.div>
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
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

