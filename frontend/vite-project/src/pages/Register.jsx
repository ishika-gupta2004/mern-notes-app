import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import bg from "../assets/loginbg.png";


export const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/register", {
                name,
                email,
                password
            });

            navigate("/login");

        } catch (err) {
            alert("Registration failed ❌");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center"style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}>

            {/* Card */}
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-[90%] max-w-md">

                {/* Heading */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Create Account 🚀
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Start your journey with Notes App
                </p>

                {/* Form */}
                <form onSubmit={registerUser} className="flex flex-col gap-5" autoComplete="off">

                    {/* Name */}
                    <input
                        type="text"
                        placeholder="Enter your name"
                        autoComplete="off"
                        className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* Email */}
                    <input
                        type="email"
                        autoComplete="off"
                        placeholder="Enter your email"
                        className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password */}
                    <input
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter your password"
                        className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
                    >
                        Register
                    </button>

                    {/* Link */}
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-pink-500 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};