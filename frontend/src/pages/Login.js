import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { username, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/users/login", formData);

            localStorage.setItem("token", res.data.token);

            navigate("/"); // Go to home page
        } catch (err) {
            setError(err.response?.data?.msg || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-indigo-600">
                    Login
                </h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                        className="w-full px-4 py-2 border rounded-md shadow-sm 
                       focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="6"
                        required
                        className="w-full px-4 py-2 border rounded-md shadow-sm 
                       focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white rounded-md 
                     font-semibold hover:bg-indigo-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
