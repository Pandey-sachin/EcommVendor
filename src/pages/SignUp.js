import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight,User} from 'lucide-react';
import api from "../common/api"

import { toast, ToastContainer } from 'react-toastify';
const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
    const [signupData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user"
    });
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setSignUpData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (signupData.password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            const response = await fetch(api.SignUp.url, {
                method: api.SignUp.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            if (!response.ok) {
                throw new Error(`${response.status} - ${response.statusText}`);
            }

            await response.json();
            toast.success("Signup successful!");
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            toast.error("Failed to create account. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <Mail className="h-12 w-12 text-red-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="mt-2 text-gray-600">Join us today and explore</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="username"
                                    value={signupData.username}
                                    onChange={handleOnChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                                    placeholder="Enter your username"
                                    required
                                />
                                <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={signupData.email}
                                    onChange={handleOnChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                                    placeholder="Enter your email"
                                    required
                                />
                                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={signupData.password}
                                    onChange={handleOnChange}
                                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                                    placeholder="Enter your password"
                                    required
                                />
                                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeOff className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmedPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                                    placeholder="Confirm your password"
                                    required
                                />
                                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmedPassword ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeOff className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {signupData.password !== confirmPassword && confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">Passwords do not match.</p>
                            )}
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Role
                            </label>
                            <select
                                value={signupData.role[0]}
                                onChange={(e) => setSignUpData(prev => ({
                                    ...prev,
                                    role: e.target.value
                                }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                            >
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                        >
                            Create Account
                            <ArrowRight className="h-5 w-5" />
                        </button>

                        {/* Sign In Link */}
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <a href="/login" className=" text-red-600 hover: font-medium">
                                Sign in
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;