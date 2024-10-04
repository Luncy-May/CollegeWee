import React, {useEffect, useState, useRef} from 'react'
import NotAuthorizedPage from '../NotAuthorizedPage';
const VirtualAssistant = () => {
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userID");

    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState((userID !== null && userID !== undefined && userID !== ""));
    useEffect(() => {
        if (isLoggedIn) {
            const time = new Date()
            const getProfile = async () => {
                try {
                    const response = await fetch(`http://localhost:8090/GetProfile/${userID}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            userID: userID,
                            lastLogin: time,
                        }),
                    })
                    if (!response.ok) {
                        throw new Error('Failed to submit the data. Please try again.')
                    }
                    // Handle response if necessary
                    const data = await response.json()
                    
                } catch (error) {
                    // Capture the error message to display to the user
                    console.error(error)
                } finally {
                    setIsLoading(false)
                }
            }
            getProfile()
        }
    }, [isLoggedIn, username, userID]);
    return (
        <div>
            <div className='pt-5 space-y-5 text-4xl font-bold flex flex-col items-center justify-center'>Profile</div>
            {isLoggedIn ? (

                <div>
                    <div className='flex flex-col items-center justify-center'>
                        <div>
                            
                            <form className='pt-5 space-y-5 text-4xl font-bold flex flex-col items-center justify-center' onSubmit={onSubmit}>
                                <button type="submit">
                                    Log Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (<div>
                <NotAuthorizedPage />
            </div>)}
        </div>
    )
}

export default VirtualAssistant
