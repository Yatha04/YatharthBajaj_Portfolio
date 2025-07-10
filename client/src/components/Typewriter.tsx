import { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  speed?: number;
  delay?: number;
}

export const Typewriter = ({ words, speed = 100, delay = 2000 }: TypewriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    if (isDeleting) {
      // Deleting effect
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
      
      const timeout = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1));
      }, speed / 2);
      
      return () => clearTimeout(timeout);
    } else {
      // Typing effect
      if (currentText === currentWord) {
        // Wait before starting to delete
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
        
        return () => clearTimeout(timeout);
      }
      
      const timeout = setTimeout(() => {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentWordIndex, isDeleting, words, speed, delay]);

  return (
    <span className="text-blue-600 dark:text-blue-400 font-semibold">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}; 