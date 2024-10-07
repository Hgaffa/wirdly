import { useState } from "react";
import { Button } from "@/components/ui/button";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white py-6 shadow-sm w-full">
            <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
                <div className="text-2xl font-bold text-gray-800">Wirdly</div>

                {/* Burger Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-800 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Navigation Buttons */}
                <div
                    className={`md:flex items-center space-x-4 ${
                        isMenuOpen ? "block" : "hidden"
                    } md:block`}
                >
                    <Button variant="ghost" className="rounded-full">
                        Features
                    </Button>
                    <Button variant="ghost" className="rounded-full">
                        Pricing
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-blue-600 text-white rounded-full hover:bg-white hover:text-black hover:border-black"
                    >
                        Get Started Free
                    </Button>
                    <Button className="rounded-full">Sign In</Button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
