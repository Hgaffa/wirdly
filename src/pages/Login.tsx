import useAuth from "@/auth/AuthContext";
import Footer from "@/components/Footer/Footer";
import LoginForm from "@/components/Login/LoginForm";
import Navbar from "@/components/Navbar/Navbar";

export default function Login() {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    return (
        <>
            <Navbar user={user}/>
            <LoginForm />
            <Footer />
        </>
    );
}
