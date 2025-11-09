import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-10 transition-opacity duration-200 blur-md ${
        isVisible ? "opacity-70" : "opacity-0"
      } hidden md:block ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-500/70 to-blue-500/50"
          : "bg-gradient-to-r from-gray-300/70 to-blue-400/50"
      }`}
      style={{
        transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
}

