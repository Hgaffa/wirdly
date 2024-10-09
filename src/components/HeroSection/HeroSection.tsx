import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <main className="flex-grow flex items-center justify-center w-full px-4 md:px-0">
            <div className="text-center">
                <img
                    src="src/assets/logo.png"
                    alt="Wirdly Logo"
                    className="w-96 mx-auto" // Increased size and centered
                />
                <Link to="/signup">
                    <Button className="w-full text-md px-6 py-3 rounded-full">
                        Get Started for free
                    </Button>
                </Link>
            </div>
        </main>
    );
}

export default HeroSection;