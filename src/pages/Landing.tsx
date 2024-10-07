import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import Footer from "@/components/Footer/Footer";

function Landing() {
    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center"
        >
            <Navbar />
            <HeroSection />
            <Footer />
        </div>
    );
}

export default Landing;