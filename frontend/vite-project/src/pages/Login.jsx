import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");

        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">

            {/* Card */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-[350px]">

                {/* Heading */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back 👋
                </h2>

                {/* Form */}
                <form onSubmit={loginUser} className="flex flex-col gap-4">

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                    >
                        Login
                    </button>

                    {/* Link */}
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-500 font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};