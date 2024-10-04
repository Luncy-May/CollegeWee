import React, { useState, useEffect, useRef } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { FaSignInAlt, FaUserPlus, FaSearch } from 'react-icons/fa';
import { Login, Register } from './AuthPages';
import NotAuthorizedPage from './NotAuthorizedPage';
const Home = ({ Darkmode }) => {
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userID");
    const [isLoading,setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState((userID !== null && userID !== undefined && userID !== ""));
    return (
        <div>
            {isLoggedIn ? (
                <div>
                <div className='pt-5 space-y-5 text-4xl font-bold flex flex-col items-center justify-center'>Welcome to Splasher</div>
                </div>
            ) : (<div>
                <div className='pt-5 space-y-5 text-4xl font-bold flex flex-col items-center justify-center'>Welcome to Splasher</div>
                <NotAuthorizedPage />
            </div>)}
        </div>
    )
}

export default Home
