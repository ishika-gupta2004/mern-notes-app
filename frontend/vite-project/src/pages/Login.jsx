import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await API.post("/auth/login", {
            email, password
        });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard")
    }

    return (
        <>
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={loginUser}>
                    <input type="email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)}></input>
                    <input type="password" placeholder="Enter Your password" onChange={(e) => setPassword(e.target.value)}></input>
                    <button>Login</button>
                    <Link to="/register">   <p className="text-blue-500">Sign up here</p></Link>
                </form>
            </div>
        </>
    )
}