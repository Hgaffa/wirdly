import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { User } from "@firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/models/UserData";

interface NavbarOptionsProps {
    user: User | null;
    userData: UserData | null;
    onSignOut: () => void;
    onSignInClick: () => void;
}

function NavbarOptions({
    user,
    userData,
    onSignOut,
    onSignInClick,
}: NavbarOptionsProps) {
    const location = useLocation();

    const isMobile = (): boolean => {
        return window.matchMedia("(max-width: 768px)").matches;
    };

    const handleSignInClick = () => {
        if (location.pathname === "/login") {
            onSignInClick();
        }
    };

    const getInitials = (name: string) => {
        const names = name.split(" ");
        const initials = names
            .map((name) => name.charAt(0).toUpperCase())
            .join("");
        return initials;
    };

    return (
        <>
            {user ? (
                <div className={`flex ${isMobile() ? 'flex-col space-y-2 items-center' : 'items-center space-x-2'}`}>
                    <Link to="/questions" className="w-full md:w-auto">
                        <Button
                            variant={isMobile() ? "outline" : "ghost"}
                            className="w-full md:w-auto bg-transparent border-black text-black rounded-full hover:bg-black hover:text-white text-md"
                        >
                            Questions
                        </Button>
                    </Link>
                    <Link to="/surahs" className="w-full md:w-auto">
                        <Button
                            variant={isMobile() ? "outline" : "ghost"}
                            className="w-full md:w-auto bg-transparent border-black text-black rounded-full hover:bg-black hover:text-white text-md"
                        >
                            Surahs
                        </Button>
                    </Link>
                    <Button
                        variant={isMobile() ? "outline" : "ghost"}
                        className="w-full md:w-auto text-black border-black bg-transparent rounded-full hover:bg-black hover:text-white text-md"
                        onClick={onSignOut}
                    >
                        Sign Out
                    </Button>
                    <Avatar>
                        <AvatarImage
                            src={user.photoURL || ""}
                            alt={user.displayName || "User"}
                        />
                        <AvatarFallback>
                            {getInitials(
                                userData?.firstName +
                                    " " +
                                    userData?.lastName || "User"
                            )}
                        </AvatarFallback>
                    </Avatar>
                </div>
            ) : (
                <div className={`flex ${isMobile() ? 'flex-col space-y-2 items-center' : 'items-center space-x-2'}`}>
                    <Button
                        variant={isMobile() ? "outline" : "ghost"}
                        className="w-full md:w-auto bg-transparent rounded-full hover:bg-black hover:text-white text-md"
                    >
                        Features
                    </Button>
                    <Button
                        variant={isMobile() ? "outline" : "ghost"}
                        className="w-full md:w-auto bg-transparent rounded-full hover:bg-black hover:text-white text-md"
                    >
                        Pricing
                    </Button>
                    <Link to="/signup" className="w-full md:w-auto">
                        <Button
                            variant="outline"
                            className="w-full md:w-auto text-black border-black bg-transparent rounded-full hover:bg-black hover:text-white text-md"
                        >
                            Get Started Free
                        </Button>
                    </Link>
                    <Link to="/login" className="w-full md:w-auto">
                        <Button
                            className="w-full md:w-auto rounded-full text-md"
                            onClick={handleSignInClick}
                        >
                            Sign In
                        </Button>
                    </Link>
                </div>
            )}
        </>
    );
}

export default NavbarOptions;