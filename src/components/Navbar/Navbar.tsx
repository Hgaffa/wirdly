import { useState } from "react";
import NavbarOptions from "./NavbarOptions";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import { MdOutlineClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { signOut, User } from "firebase/auth"; // Import User type
import { auth } from "@/firebase";
import { UserData } from "@/models/UserData";

interface NavbarProps {
    user: User | null;
    userData: UserData | null;
}

function Navbar({ user, userData }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("user signed out");
                navigate("/");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    const handleSignInClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="py-6 shadow-sm w-full">
            <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
                <Link to="/">
                    <img
                        src="src/assets/logo_no_text.png"
                        alt="Wirdly Logo"
                        className="w-44"
                    />
                </Link>
                {/* Burger Menu Button */}
                <div className="md:hidden">
                    <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <DrawerTrigger asChild>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="border-black bg-transparent text-gray-800 focus:outline-none"
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
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="flex flex-col space-y-4 p-4">
                                <NavbarOptions
                                    user={user}
                                    userData={userData}
                                    onSignOut={handleSignOut}
                                    onSignInClick={handleSignInClick}
                                />
                            </div>
                            <DrawerFooter>
                                <DrawerClose className="bg-transparent flex justify-center">
                                    <MdOutlineClose className="w-6 h-6" />
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>

                {/* Navigation Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    <NavbarOptions
                        user={user}
                        userData={userData}
                        onSignOut={handleSignOut}
                        onSignInClick={() => setIsMenuOpen(false)}
                    />
                </div>
            </div>
        </header>
    );
}

export default Navbar;
