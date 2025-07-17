import { ArrowRight, Mail } from 'lucide-react';

const NewsletterSection = () => {
    return (
        <section className="bg-white py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    {/* Header Section */}
                    <div className="mb-8 text-center md:mb-10">
                        <h2 className="mb-3 text-3xl font-bold text-cyan-600 md:text-4xl">
                            Stay Updated with{' '}
                            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Industry Insights</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-slate-600">
                            Get the latest updates on steel solutions, industry trends, and engineering innovations delivered to your inbox.
                        </p>
                    </div>

                    {/* Newsletter Form */}
                    <div className="mx-auto max-w-2xl">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                            <form
                                action="https://devloops.us17.list-manage.com/subscribe/post?u=a0091f78f874cb693028bc8d9&amp;id=997de3977b"
                                method="post"
                                target="_blank"
                                noValidate
                                className="flex flex-col gap-4 sm:flex-row sm:gap-3"
                            >
                                <div className="relative flex-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="EMAIL"
                                        placeholder="Enter your email address"
                                        className="w-full rounded-xl border-2 border-slate-200 bg-white py-4 pr-4 pl-12 text-slate-800 placeholder-slate-500 transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    name="subscribe"
                                    className="group rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:shadow-orange-500/25 sm:px-8"
                                >
                                    <span className="flex items-center justify-center">
                                        Subscribe
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </button>
                            </form>

                            <div className="mt-4 text-center">
                                <p className="text-sm text-slate-500">Join 500+ industry professionals. Unsubscribe anytime.</p>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-8 grid grid-cols-1 gap-4 text-center sm:grid-cols-3 md:mt-10">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div className="mb-2 text-2xl font-bold text-cyan-600">500+</div>
                            <div className="text-sm text-slate-600">Subscribers</div>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div className="mb-2 text-2xl font-bold text-cyan-600">Weekly</div>
                            <div className="text-sm text-slate-600">Updates</div>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div className="mb-2 text-2xl font-bold text-cyan-600">Expert</div>
                            <div className="text-sm text-slate-600">Insights</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
