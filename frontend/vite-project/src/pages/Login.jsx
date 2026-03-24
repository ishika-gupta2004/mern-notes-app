import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });
            // console.log( res.data);

            localStorage.setItem("token", res.data.token);
            const name = res.data?.user?.name;

            if (name) {
                localStorage.setItem("name", name);
            } else {
                localStorage.setItem("name", "User");
            }
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-[90%] max-w-md"
            >
                {/* Heading */}
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
                    Welcome Back 👋
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Login to continue your journey
                </p>

                {/* Form */}
                <form
                    onSubmit={loginUser}
                    className="flex flex-col gap-5"
                    autoComplete="off"
                >
                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            autoComplete="off"
                            placeholder="Enter your email"
                            className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            placeholder="Enter your password"
                            className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition duration-300"
                    >
                        Login
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-[1px] bg-gray-300" />
                        <span className="text-sm text-gray-400">OR</span>
                        <div className="flex-1 h-[1px] bg-gray-300" />
                    </div>

                    {/* Google Button (optional UI) */}
                    <button
                        type="button"
                        className="border py-3 rounded-xl hover:bg-gray-100 transition"
                    >
                        Continue with Google
                    </button>

                    {/* Link */}
                    <p className="text-center text-sm text-gray-600">
                        Don’t have an account?{' '}
                        <Link
                            to="/register"
                            className="text-indigo-500 font-semibold hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};
