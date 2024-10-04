import React, { useState, useEffect, useRef } from 'react'
import { ProgressPie, Histogram, ShortCut } from '../components'
import LineGraph from '../components/LineGraph'
import NotAuthorizedPage from './NotAuthorizedPage';

const Dashboard = ({ Darkmode }) => {

    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userID");
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState((userID !== null && userID !== undefined && userID !== ""));
    useEffect(() => {
        if (isLoggedIn) {
            const getDashboard = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/DeleteUser/${userID}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            userID: userID
                        }),
                    })
                    if (!response.ok) {
                        throw new Error('Failed to submit the data. Please try again.')
                    }
                    // Handle response if necessary
                    const data = await response.json()
                    setError(data.message)

                } catch (error) {
                    // Capture the error message to display to the user

                    console.error(error)
                } finally {
                    setIsLoading(false)
                }
            }
            getDashboard()
        }
    }, [isLoggedIn, userID, username])
    return (
        <div>
            {isLoggedIn ? (
                <div className='pl-[10vw] space-y-10 p-3 mt-[5vh] overflow-hidden'>
                    <div className='pt-5 space-y-5 text-4xl font-bold'>{username}'s Dashboard</div>

                    <div className='flex justify-between items-center max-w-[1400px]'>
                        <div className='flex-shrink-0'>
                            <ProgressPie />
                        </div>

                        <div className='flex-shrink-0'>
                            <LineGraph />
                        </div>

                        <div className='flex-shrink-0'>
                            <ShortCut />
                        </div>
                    </div>

                    {/* Histogram section */}
                    <div>
                        <Histogram />
                    </div>
                </div>
            ) : (<div>
                <div className='pt-5 space-y-5 text-4xl font-bold flex flex-col items-center justify-center'>Dashboard</div>
                <NotAuthorizedPage />
            </div>)}
        </div>
    )
}

export default Dashboard
