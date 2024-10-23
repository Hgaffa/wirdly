import { Link } from "react-router-dom";
import { User } from "firebase/auth"; // Import User type
import { UserData } from "@/models/UserData";
import WordPullUp from "../ui/word-pull-up";
import ShimmerButton from "../ui/shimmer-button";

interface HeroSectionProps {
    user: User | null;
    userData: UserData | null;
}

function HeroSection({ user, userData }: HeroSectionProps) {
    return (
        <>
            {/* Hero Section */}
            <section id="hero" className="flex-grow flex items-center justify-center w-full">
                {user ? (
                    <>
                        <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8 text-center">
                            Hello World!
                        </div>
                    </>
                ) : (
                    <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8 text-center">
                        <WordPullUp
                            className="text-center text-4xl text-foreground sm:text-5xl md:text-6xl space-y-2 space-x-2 mb-4"
                            words="Your hifz journey, simplified."
                        />
                        <p className="mx-auto max-w-xl text-center text-sm leading-7 text-muted-foreground sm:text-xl sm:leading-9 text-balance">
                            Wirldy is an AI powered Quran Memorisation tool,
                            offering progress tracking, gamified revision, and
                            personalized challenges for all levels.
                        </p>
                        <div className="flex justify-center items-center h-full">
                            <Link to="/signup">
                                <ShimmerButton className="shadow-2xl mt-2">
                                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                        Get Started
                                    </span>
                                </ShimmerButton>
                            </Link>
                        </div>
                    </div>
                )}
            </section>

        </>
    );
}

export default HeroSection;
