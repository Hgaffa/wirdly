import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import Footer from "@/components/Footer/Footer";
import useAuth from '@/auth/AuthContext';

function Landing() {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    return (
        <>
            <Navbar user={user} />
            <HeroSection />
            <Footer />
        </>
    );
}

export default Landing;