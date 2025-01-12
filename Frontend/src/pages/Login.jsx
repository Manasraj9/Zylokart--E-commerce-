import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbars/Navbar'
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed. Please check your credentials.');
            }

            if (data.jwt && data.user) {
                // Store token and user data in localStorage
                localStorage.setItem('token', data.jwt);
                localStorage.setItem('userType', data.user.userType || 'Guest'); // Default to 'Guest' if undefined
                localStorage.setItem('loginTime', new Date().getTime());

                toast.success('Login successful!');
                const token = localStorage.getItem('token');

                // Print it to the console
                console.log(token);
                console.log(data.user.email)
                // Redirect based on userType
                if (data.user.userType === 'Admin') {
                    navigate('/Admin'); // Admin homepage
                } else if (data.user.userType === 'Customer') {
                    navigate('/Customer'); // Customer
                } else if (data.user.userType === 'Seller') {
                    navigate('/Seller'); // Seller
                } else {
                    console.warn('Unknown userType:', data.user.userType);
                    navigate('/'); // Default fallback homepage
                }
            } else {
                toast.error(data.message || 'Unexpected error. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            toast.error(`An error occurred: ${error.message}`);
        }
    };

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsTyping(e.target.value.length > 0);
    };

    return (
        <div>
            <Navbar />
            <div className='flex justify-center'>
                <div>
                    <img src="/images/Login.svg" alt="page for Login" className="w-[780px] h-[650px] bg-white" />
                </div>
                <div className="w-[750px] bg-[#dbe2ef]">
                    <h1 className='text-6xl text-[#112d4e] text-center mt-[100px]'>Login</h1>
                    <div className='ml-[100px] mt-[40px] w-[550px] text-[#112d4e] justify-center'>
                        <form onSubmit={handleLogin}>
                            <p className='mb-1'>Enter Email Address</p>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full mb-6 p-2 border rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className='mb-1'>Enter password</p>
                            <div className="relative w-full mb-5">
                                <input
                                    type="text"
                                    placeholder="Password"
                                    className="w-full p-2 border rounded"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    style={{ WebkitTextSecurity: showPassword ? 'none' : 'disc' }}
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                >
                                    {isTyping ? (
                                        showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />
                                    ) : (
                                        <AiFillEye size={24} />
                                    )}
                                </span>
                            </div>
                            <div className='flex'>
                                <div className="flex items-center mb-1">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={handleCheckboxChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="rememberMe" className="ml-2 text-gray-700">
                                        Remember Me
                                    </label>
                                </div>
                                <div className="mt-0.5 flex ml-auto justify-center items-center mb-1">
                                    <p className="text-base text-[#112d4e]">Forgot Password?</p>
                                    <Link to="/Resetpassword">
                                        <p className="text-blue-400 hover:underline pl-[4px]">Reset it</p>
                                    </Link>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                                Login
                            </button>
                        </form>
                        <div className="mt-2 flex">
                            <p className="text-base text-[#112d4e]">Don't have an Account?</p>
                            <Link to="/Register">
                                <p className="text-blue-400 hover:underline pl-[4px]">Register</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
