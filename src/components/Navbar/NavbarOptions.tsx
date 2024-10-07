import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

interface NavbarOptionsProps {
    onSignInClick: () => void;
}

function NavbarOptions({ onSignInClick }: NavbarOptionsProps) {
    const location = useLocation();

    const handleSignInClick = () => {
        if (location.pathname === "/login") {
            onSignInClick();
        }
    };

    return (
        <>
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
            <Link to="/login">
                <Button
                    className="rounded-full w-full"
                    onClick={handleSignInClick}
                >
                    Sign In
                </Button>
            </Link>
        </>
    );
}

export default NavbarOptions;
