
import React, { useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
export default function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [username, setUsername] = useState("")
    const userID = localStorage.getItem("userID")
    const [password, setPassword] = useState("")
    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const [subscription, setSubscription] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState((userID !== null && userID !== undefined && userID !== ""));
    async function onSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch('http://localhost:8090/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

            // Handle response if necessary
            const data = await response.json()
            setError(data.message)
            if (data.success){
                alert("Welcome Back, "+ data.username + "!")
                localStorage.setItem("userID", data.userID)
                localStorage.setItem("username", data.username)
                navigate("/")
            }  
            // ...
        } catch (error) {
            // Capture the error message to display to the user
            setError(error.message)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mspace-y-10 p-3 mt-[5vh] flex flex-col items-center justify-center overflow-hidden">
            {isLoggedIn ? (<div>
                <Link className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' to="/">Return to Home</Link>
                <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}> You are already logged in! </h1>
            </div>) : (<div className='pt-5 space-y-10 text-3xl font-bold p-20'>
                <Link className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' to="/">Return to Home</Link>

                <h1>Login with an existing account. We are excited to see you back!</h1>
                <form className='space-y-5' onSubmit={onSubmit}>
                    <h2>What is your username?</h2>
                    <input className='border border-gray-200 shadow-md hover:shadow-2xl' type="text" name="username" placeholder='username here' onChange={handleChangeUsername} />
                    <h2>What is your password?</h2>
                    <input className='border border-gray-200 shadow-md hover:shadow-2xl' type="password" name="password" placeholder='password here' onChange={handleChangePassword} />
                    <br></br><button className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' type="submit" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                </form>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>)}

        </div>
    )
}
