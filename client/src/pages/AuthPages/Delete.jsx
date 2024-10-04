import React, {useState, useEffect, useRef} from 'react'

const Delete = () => {
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userID");
    const [isLoading,setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState((userID !== null && userID !== undefined && userID !== ""));
    useEffect(() => {
        // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(() => {
          setButtonDisabled(false);
        }, 5000);
    
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
      }, []); // Empty dependency array ensures the effect runs only once
    
    useEffect(() => {
        const time = new Date()
        const deleteUser = async () => {
            try {
                const response = await fetch(`http://localhost:8090/DeleteUser/${userID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userID: userID,
                        lastLogin: time,
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
                setError(error.message)
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        deleteUser()
    })
  return (
    <div>
      <div className="mspace-y-10 p-3 mt-[5vh] flex flex-col items-center justify-center overflow-hidden">
            {isLoggedIn ? (<div>
                <Link className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' to="/">Return to Home</Link>
                <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginBottom: "20px" }}> Not authorized to view the page. </h1>
            </div>) : (<div className='pt-5 space-y-10 text-3xl font-bold p-20'>
                <Link className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' to="/">Return to Home</Link>
                
                <h1>Are you sure you want to delete the account? We will be very sad to see you go</h1>
                <h1>You have 5 seconds to reconsider</h1>
                <form className='space-y-5' onSubmit={onSubmit}>
                    <br></br><button className='border border-gray-200 shadow-md hover:shadow-2xl p-2.5' type="submit" disabled={buttonDisabled}>
                        {isLoading ? 'Loading...' : 'Confirm Account DELETION'}
                    </button>
                </form>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                </div>)}

        </div>
    </div>
  )
}

export default Delete
