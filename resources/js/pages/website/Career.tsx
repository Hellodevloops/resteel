// pages/career.tsx
import Layout from './Layout';
import { Award, Clock, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const Career = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        setTimeout(() => setIsVisible(true), 100);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openPositions = [
        {
            title: 'Senior Structural Engineer',
            department: 'Engineering',
            location: 'Waterbeemd 2B, 5705 DN, Helmond, The Netherlands',
            type: 'Full-time',
            experience: '5+ years',
        },
        {
            title: 'Project Manager - Steel Fabrication',
            department: 'Operations',
            location: 'Waterbeemd 2B, 5705 DN, Helmond, The Netherlands',
            type: 'Full-time',
            experience: '7+ years',
        },
        {
            title: 'CAD Designer',
            department: 'Design',
            location: 'Waterbeemd 2B, 5705 DN, Helmond, The Netherlands',
            type: 'Full-time',
            experience: '3+ years',
        },
        {
            title: 'Quality Control Inspector',
            department: 'Quality Assurance',
            location: 'Waterbeemd 2B, 5705 DN, Helmond, The Netherlands',
            type: 'Full-time',
            experience: '4+ years',
        },
        {
            title: 'Sales Engineer',
            department: 'Business Development',
            location: 'Waterbeemd 2B, 5705 DN, Helmond, The Netherlands',
            type: 'Full-time',
            experience: '2+ years',
        },
    ];

    return (
        <Layout title="Careers | Resteel">
            <div className="bg-slate-50">
                {/* Open Positions Section */}
                <section className="relative bg-slate-50 py-30">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-cyan-600">
                                Current{' '}
                                <span className="ms-2 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                                    Opportunities
                                </span>{' '}
                            </h2>
                            <p className="mx-auto max-w-3xl text-xl text-slate-600">
                                Discover your next career move with positions across engineering, operations, and management
                            </p>
                        </div>

                        <div className="space-y-6">
                            {openPositions.map((position, index) => (
                                <div
                                    key={index}
                                    className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                        <div className="flex-1">
                                            <div className="mb-2 flex flex-wrap items-center gap-3">
                                                <h3 className="text-xl font-semibold text-cyan-600">{position.title}</h3>
                                                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-600">
                                                    {position.department}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    {position.location}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    {position.type}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Award className="h-4 w-4" />
                                                    {position.experience}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                                                View Details
                                            </button>
                                            <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 group-hover:bg-orange-600 hover:shadow-lg">
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <p className="mb-6 text-slate-600">
                                Don't see the right fit? We're always looking for exceptional talent.
                            </p>
                            <button className="rounded-xl bg-slate-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-xl">
                                Submit Your Resume
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Career;
