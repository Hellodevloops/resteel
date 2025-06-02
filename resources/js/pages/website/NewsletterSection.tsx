import { ArrowRight } from 'lucide-react';

const NewsletterSection = () => {
    return (
        <section className="relative bg-white py-16 text-white">
            <div className="relative container mx-auto px-4 md:px-6 lg:px-8">
                <div className="relative mx-auto max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-6 backdrop-blur-sm md:p-8">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `radial-gradient(circle at 20% 80%, rgba(244, 70, 17, 0.1) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 20%, rgba(30, 76, 138, 0.1) 0%, transparent 50%),
                                 radial-gradient(circle at 40% 40%, rgba(74, 83, 99, 0.1) 0%, transparent 50%)`,
                            }}
                        ></div>
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
                                backgroundSize: '40px 40px',
                            }}
                        ></div>
                    </div>

                    {/* Floating Elements */}
                    {/* <div
                        className="absolute top-20 left-10 h-16 w-16 animate-bounce rounded-full bg-orange-500/10"
                        style={{ animationDuration: '6s' }}
                    ></div> */}
                    {/* <div
                        className="absolute top-40 right-20 h-12 w-12 animate-bounce rounded-full bg-blue-600/10"
                        style={{ animationDuration: '8s', animationDelay: '-2s' }}
                    ></div>
                    <div
                        className="absolute right-32 bottom-32 h-20 w-20 animate-bounce rounded-full bg-orange-500/5"
                        style={{ animationDuration: '7s', animationDelay: '-4s' }}
                    ></div> */}

                    <div className="relative">
                        <h4 className="mb-3 text-lg font-semibold text-white md:text-xl">Stay Updated</h4>
                        <p className="mb-4 text-sm text-slate-300 md:text-base">Receive our newsletters</p>
                        <div className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/50 focus:outline-none"
                            />
                            <button className="group flex items-center justify-center rounded-lg bg-orange-500 px-4 py-2 transition-colors hover:bg-orange-600">
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
