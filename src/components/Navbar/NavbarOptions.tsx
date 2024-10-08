import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { User } from "@firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarOptionsProps {
    user: User | null;
    onSignOut: () => void;
    onSignInClick: () => void;
}

function NavbarOptions({ user, onSignOut, onSignInClick }: NavbarOptionsProps) {
    const location = useLocation();

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
                <div className="flex items-center space-x-4">
                    <Link to="/surahs">
                        <Button
                            variant="ghost"
                            className="bg-transparent text-black rounded-full hover:bg-black hover:text-white text-md"
                        >
                            Surahs
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        className="text-black border-black bg-transparent rounded-full hover:bg-black hover:text-white text-md"
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
                            {getInitials(user.displayName || "User")}
                        </AvatarFallback>
                    </Avatar>
                </div>
            ) : (
                <>
                    <Button
                        variant="ghost"
                        className="bg-transparent rounded-full hover:bg-black hover:text-white text-md"
                    >
                        Features
                    </Button>
                    <Button
                        variant="ghost"
                        className="bg-transparent rounded-full hover:bg-black hover:text-white text-md"
                    >
                        Pricing
                    </Button>
                    <Button
                        variant="outline"
                        className="text-black border-black bg-transparent rounded-full hover:bg-black hover:text-white text-md"
                    >
                        Get Started Free
                    </Button>
                    <Link to="/login">
                        <Button
                            className="rounded-full w-full text-md"
                            onClick={handleSignInClick}
                        >
                            Sign In
                        </Button>
                    </Link>
                </>
            )}
        </>
    );
}

export default NavbarOptions;
