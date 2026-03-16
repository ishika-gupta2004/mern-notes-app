import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import { useState } from "react";


export const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();

        await API.post("/auth/register", {
            name,
            email,
            password
        })

        navigate("/login");
    }

    return (
        <>
            <div className="container">
                <h2>Register</h2>
                <form onSubmit={registerUser}>
                    <input type="name" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)}></input>
                    <input type="email" placeholder="Enter Your email" onChange={(e) => setEmail(e.target.value)}></input>
                    <input type="password" placeholder="Enter Your password" onChange={(e) => setPassword(e.target.value)}></input>
                    <button>Register</button>
                </form>
            </div>
        </>
    )
}