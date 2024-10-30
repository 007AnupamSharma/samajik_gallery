import React, { useState } from "react";



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");


        if (!email || !password) {
            setError("Both email and password are required.");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            if (email === "user@example.com" && password === "password123") {
                alert("Login successful!");
       
                
            } else {
                setError("Invalid email or password.");
            }
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Admin Login</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    {error && (
                        <div className="text-red-600 text-sm mb-4">
                            {error}
                        </div>
                    )}
                    <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <label className="block text-gray-600 text-sm font-medium mt-4 mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-6 p-2 rounded ${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"} text-white font-semibold`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
