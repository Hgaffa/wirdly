import useAuth from "@/auth/AuthContext";
import Footer from "@/components/Footer/Footer";
import SignupForm from "@/components/Signup/SignupForm";
import Navbar from "@/components/Navbar/Navbar";

export default function Signup() {
    const { user, userData, loading } = useAuth();

    if (loading) {
        return null;
    }

    return (
        <>
            <Navbar user={user} userData={userData}/>
            <SignupForm />
            <Footer />
        </>
    );
}
