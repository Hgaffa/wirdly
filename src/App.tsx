import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Surahs from "./pages/Surahs";
import Signup from "./pages/Signup";
import Questions from "./pages/Questions";
import { Analytics } from '@vercel/analytics/react';

function App() {
    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center"
            style={{
                background:
                    "white",
            }}
        >
            <Routes>
                <Route index path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/surahs" element={<Surahs />} />
                <Route path="/questions" element={<Questions />} />
                <Analytics />
            </Routes>
        </div>
    );
}

export default App;
