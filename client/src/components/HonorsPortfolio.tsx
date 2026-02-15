import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export const HonorsPortfolio = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-background text-foreground py-16 px-4"
        >
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="mb-8 group flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Button>

                <header className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <BookOpen className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-5xl font-bold italic">Honors Portfolio</h1>
                    </div>
                    <p className="text-xl text-muted-foreground italic">
                        Documenting my academic journey and achievements.
                    </p>
                </header>

                <section className="space-y-12 italic">
                    <div className="p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-xl">
                        <h2 className="text-3xl font-bold mb-4">Under Construction</h2>
                        <p className="text-lg">
                            I am currently curating my experiences and reflections for this portfolio. Check back soon!
                        </p>
                    </div>
                </section>
            </div>
        </motion.div>
    );
};
