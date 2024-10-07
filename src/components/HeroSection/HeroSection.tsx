import { Button } from "@/components/ui/button";

function HeroSection() {
    return (
        <main className="flex-grow flex items-center justify-center w-full px-4 md:px-0">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4 text-gray-800">
                    Welcome to Wirdly!
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    Get started with us today. It's fast, easy, and free!
                </p>
                <Button className="bg-green-500 text-white px-6 py-3 rounded-full">
                    Get Started for free
                </Button>
            </div>
        </main>
    );
}

export default HeroSection;
