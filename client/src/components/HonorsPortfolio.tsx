import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Users, Beaker, GraduationCap, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { honorsData } from '../data/honors';

const iconMap: { [key: string]: any } = {
    Beaker: Beaker,
    Users: Users,
    BookOpen: BookOpen,
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    }
} as const;

export const HonorsPortfolio = () => {
    const navigate = useNavigate();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-background text-foreground py-16 px-4"
        >
            <div className="max-w-6xl mx-auto space-y-24">
                {/* Header & Back Button */}
                <header>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        className="mb-8 group flex items-center gap-2 pl-0 hover:pl-2 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Button>
                    <div className="flex flex-col md:flex-row md:items-end gap-6 border-b border-border/40 pb-8">
                        <div>
                            <div className="inline-flex p-3 bg-primary/10 rounded-2xl mb-4">
                                <GraduationCap className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Honors Portfolio</h1>
                            <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
                                Documenting my academic journey, reflections, and Honors Experiences at the University of Cincinnati.
                            </p>
                        </div>
                    </div>
                </header>

                {/* About Me Section - Bento Grid */}
                <section>
                    <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Image Grid */}
                        <div className="grid grid-cols-2 gap-4 h-full min-h-[400px]">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-lg"
                            >
                                <img
                                    src={honorsData.aboutMe.images[0]}
                                    alt="University Life"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="rounded-3xl overflow-hidden shadow-lg aspect-square"
                            >
                                <img
                                    src={honorsData.aboutMe.images[1]}
                                    alt="Travel"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="rounded-3xl overflow-hidden shadow-lg aspect-square"
                            >
                                <img
                                    src={honorsData.aboutMe.images[2]}
                                    alt="Technology"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                <span className="bg-primary/20 w-8 h-1 rounded-full"></span>
                                About Me
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <div className="relative pl-8 border-l-4 border-primary/20">
                                    <Quote className="absolute -left-3 -top-3 w-6 h-6 bg-background text-primary/50" />
                                    {honorsData.aboutMe.text.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="mb-4 text-lg leading-relaxed text-muted-foreground">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Year-In Reviews Section -- Vertical Timeline */}
                <section>
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="text-3xl font-bold flex items-center gap-3 mb-16">
                            <span className="bg-primary/20 w-8 h-1 rounded-full"></span>
                            Year-In Reviews
                        </h2>
                    </motion.div>

                    <div className="relative border-l-2 border-border/50 ml-4 md:ml-12 space-y-24">
                        {honorsData.yearReviews.map((year, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative pl-8 md:pl-12"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-background border-4 border-primary rounded-full box-border" />

                                <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                            <span className="text-sm font-bold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full w-fit">
                                                {year.year}
                                            </span>
                                            <h3 className="text-2xl font-bold">{year.title}</h3>
                                        </div>
                                        <div className="bg-card/30 backdrop-blur-sm border border-border/40 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                                {year.content}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Image Gallery for this Year */}
                                    {year.images && year.images.length > 0 && (
                                        <div className="flex flex-col gap-4">
                                            {year.images.map((img, imgIndex) => (
                                                <motion.div
                                                    key={imgIndex}
                                                    whileHover={{ scale: 1.03, rotate: imgIndex % 2 === 0 ? 1 : -1 }}
                                                    className="rounded-2xl overflow-hidden shadow-md h-full min-h-[200px]"
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`${year.year} highlight ${imgIndex + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Honors Experiences Section */}
                <section>
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="text-3xl font-bold flex items-center gap-3 mb-12">
                            <span className="bg-primary/20 w-8 h-1 rounded-full"></span>
                            Honors Experiences
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {honorsData.honorsExperiences.map((exp, index) => {
                            const Icon = exp.icon ? iconMap[exp.icon] : Beaker;
                            const isExpanded = expandedIndex === index;

                            return (
                                <motion.div
                                    layout
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={!isExpanded ? { y: -5 } : {}}
                                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                    className={`group relative bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl overflow-hidden hover:bg-card/60 transition-colors cursor-pointer ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}
                                >
                                    {/* Collapsed layout: image banner on top, content below */}
                                    {!isExpanded && (
                                        <>
                                            {exp.image && (
                                                <div className="w-full h-44 overflow-hidden">
                                                    <img
                                                        src={exp.image}
                                                        alt={exp.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                                                        <Icon className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold leading-tight">{exp.title}</h3>
                                                        <div className="text-xs font-medium text-primary mt-0.5">{exp.role}</div>
                                                    </div>
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{exp.description}</p>
                                                <div className="flex items-center gap-1.5 text-primary text-sm font-medium">
                                                    Read More
                                                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Expanded layout: image on left, content on right */}
                                    {isExpanded && (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col lg:flex-row"
                                        >

                                            {/* Right: text content */}
                                            <div className="flex-1 p-7 overflow-auto">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2.5 bg-primary/10 rounded-xl">
                                                        <Icon className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold leading-tight">{exp.title}</h3>
                                                        <div className="text-sm font-medium text-primary mt-0.5">{exp.role}</div>
                                                    </div>
                                                </div>

                                                <p className="text-muted-foreground text-sm leading-relaxed mb-5 pb-5 border-b border-border/40">
                                                    {exp.description}
                                                </p>

                                                {exp.longDescription && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                        className="text-muted-foreground text-sm leading-relaxed space-y-4"
                                                    >
                                                        {exp.longDescription.split('\n\n').map((para, i) => (
                                                            <p key={i}>{para.trim()}</p>
                                                        ))}
                                                    </motion.div>
                                                )}

                                                <div className="mt-6 flex items-center gap-1.5 text-primary text-sm font-medium">
                                                    <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                    Show Less
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </motion.div>
    );
};
