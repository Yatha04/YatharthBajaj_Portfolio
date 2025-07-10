"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { 
  Code2Icon, ServerIcon, DatabaseIcon, CloudIcon, 
  CodeIcon, BrainCircuitIcon, LibraryIcon, 
  PackageIcon, BarChart3Icon, LayoutIcon, 
  ApertureIcon, GaugeIcon, TerminalIcon, 
  BoxIcon, CircuitBoardIcon
} from "lucide-react";

// Map of category names to their corresponding icons
const categoryIcons: Record<string, React.ReactNode> = {
  "AI/ML/DL": <BrainCircuitIcon className="h-4 w-4" />,
  "Python Libraries": <LibraryIcon className="h-4 w-4" />,
  "Web Frameworks": <LayoutIcon className="h-4 w-4" />,
  "Cloud": <CloudIcon className="h-4 w-4" />,
  "Big Data": <BarChart3Icon className="h-4 w-4" />,
  "Databases": <DatabaseIcon className="h-4 w-4" />,
  "Languages": <CodeIcon className="h-4 w-4" />,
  "Other": <ApertureIcon className="h-4 w-4" />
};

// Map skill keywords to minimal black and white icons
const getSkillIcon = (skill: string): React.ReactNode => {
  const lowerSkill = skill.toLowerCase();
  
  if (lowerSkill.includes('python')) {
    return <TerminalIcon className="h-3.5 w-3.5" />;
  } else if (lowerSkill.includes('react') || lowerSkill.includes('vue')) {
    return <CodeIcon className="h-3.5 w-3.5" />;
  } else if (lowerSkill.includes('node') || lowerSkill.includes('express')) {
    return <ServerIcon className="h-3.5 w-3.5" />;
  } else if (lowerSkill.includes('docker') || lowerSkill.includes('kubernetes')) {
    return <BoxIcon className="h-3.5 w-3.5" />;
  } else if (lowerSkill.includes('aws') || lowerSkill.includes('azure') || lowerSkill.includes('cloud')) {
    return <CloudIcon className="h-3.5 w-3.5" />;
  } else if (lowerSkill.includes('ml') || lowerSkill.includes('ai') || lowerSkill.includes('pytorch') || lowerSkill.includes('tensorflow')) {
    return <BrainCircuitIcon className="h-3.5 w-3.5" />;
  } else if (lowerSkill.includes('sql') || lowerSkill.includes('mongo') || lowerSkill.includes('database')) {
    return <DatabaseIcon className="h-3.5 w-3.5" />;
  } else if (lowerSkill.includes('css') || lowerSkill.includes('html')) {
    return <LayoutIcon className="h-3.5 w-3.5" />;
  } else if (lowerSkill.includes('typescript') || lowerSkill.includes('javascript')) {
    return <Code2Icon className="h-3.5 w-3.5" />;
  } else if (lowerSkill.includes('api') || lowerSkill.includes('rest')) {
    return <ServerIcon className="h-3.5 w-3.5" />;
  } else if (lowerSkill.includes('transformers') || lowerSkill.includes('hugging')) {
    return <CircuitBoardIcon className="h-3.5 w-3.5" />;
  } else if (lowerSkill.includes('fastapi') || lowerSkill.includes('flask') || lowerSkill.includes('django')) {
    return <PackageIcon className="h-3.5 w-3.5" />;
  }

  return <GaugeIcon className="h-3.5 w-3.5" />;
};

interface SkillCategoryProps {
  name: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  count: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ name, icon, isActive, onClick, count }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "text-xs px-3 py-1.5 rounded-full transition-all duration-300 font-medium flex items-center gap-1.5",
        isActive 
          ? "bg-primary text-primary-foreground shadow-md" 
          : "bg-muted hover:bg-muted/80"
      )}
    >
      <div className="flex items-center gap-1">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{name}</span>
      </div>
      <span className={cn(
        "inline-flex items-center justify-center rounded-full text-xs w-4 h-4",
        isActive 
          ? "bg-primary-foreground text-primary"
          : "bg-background text-muted-foreground"
      )}>
        {count}
      </span>
    </button>
  );
};

// Extract category from skill text, assuming format like "AI/ML/DL: PyTorch, Transformers..."
const extractCategory = (skill: string): { category: string; skills: string } => {
  const parts = skill.split(":");
  if (parts.length > 1) {
    return {
      category: parts[0].trim(),
      skills: parts[1].trim()
    };
  }
  return {
    category: "Other",
    skills: skill
  };
};

interface InteractiveSkillsProps {
  skills: string[];
}

export const InteractiveSkills: React.FC<InteractiveSkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  
  const categorizedSkills = skills.reduce<Record<string, string[]>>((acc, skill) => {
    const { category, skills } = extractCategory(skill);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skills);
    return acc;
  }, {} as Record<string, string[]>);
  
  const categories = Object.keys(categorizedSkills);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedSkill(null);
  };

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(selectedSkill === skill ? null : skill);
  };

  const getAllSkills = (): string[] => {
    return Object.values(categorizedSkills).flatMap((categorySkills: string[]) => 
      categorySkills.flatMap((skillString: string) => 
        skillString.split(',').map((skill: string) => skill.trim())
      )
    );
  };

  const getSkillsFromCategory = (category: string): string[] => {
    const categorySkills = categorizedSkills[category as keyof typeof categorizedSkills];
    return categorySkills?.flatMap((skillString: string) => 
      skillString.split(',').map((skill: string) => skill.trim())
    ) || [];
  };

  const currentSkills = selectedCategory ? getSkillsFromCategory(selectedCategory) : getAllSkills();

  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-4 justify-start">
        <SkillCategory
          key="all"
          name="All Skills"
          icon={<ApertureIcon className="h-4 w-4" />}
          isActive={selectedCategory === null}
          onClick={() => setSelectedCategory(null)}
          count={getAllSkills().length}
        />
        {categories.map((category) => (
          <SkillCategory
            key={category}
            name={category}
            icon={categoryIcons[category] || categoryIcons["Other"]}
            isActive={selectedCategory === category}
            onClick={() => handleCategoryClick(category)}
            count={getSkillsFromCategory(category).length}
          />
        ))}
      </div>
      
      <Card className="p-4 border border-muted bg-muted/5 rounded-xl shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory || 'all'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {currentSkills.map((skill, index) => (
              <motion.div
                key={`${skill}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={selectedSkill === skill ? "default" : "secondary"}
                  className={cn(
                    "cursor-pointer transition-all duration-200 text-xs px-2 py-1",
                    selectedSkill === skill 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-muted/80"
                  )}
                  onClick={() => handleSkillClick(skill)}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="flex-shrink-0">{getSkillIcon(skill)}</span>
                    <span className="font-medium">{skill}</span>
                  </div>
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};