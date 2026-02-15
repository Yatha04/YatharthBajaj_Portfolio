import { education } from '../data/experiences';
import { GraduationCap, MapPin, Star } from 'lucide-react';

export const Education = () => {
    return (
        <div className="py-16 px-4 bg-transparent">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Education</h2>
                </div>

                <div className="relative w-full rounded-lg p-6 backdrop-blur-md bg-card/50 dark:bg-card/30 border border-border/50 hover:border-border transition-all duration-150 ease-in-out group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F2F2F2] to-[#D9D9D9] dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-50 transition-opacity duration-150 ease-in-out rounded-lg"></div>

                    <div className="relative flex items-start gap-4 w-full">
                        <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl shrink-0">
                            <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 w-full">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {education.institution}
                                </h3>
                                <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                    {education.degree}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 mt-2">
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Major: {education.major}
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                                    <MapPin className="w-4 h-4" />
                                    {education.location}
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                                    <Star className="w-4 h-4" />
                                    GPA: {education.gpa}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
