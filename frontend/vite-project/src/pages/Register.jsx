import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-indigo-600">

            {/* Card */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-[350px]">

                {/* Heading */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Account 🚀
                </h2>

                {/* Form */}
                <form onSubmit={registerUser} className="flex flex-col gap-4">

                    {/* Name */}
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        className="bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300"
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