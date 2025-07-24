import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [loading , setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [showOtpModal, setShowOtpModal] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            console.log("UseEffect chala......")
            try {
                const res = await axios.get("https://hackathon-sage-zeta.vercel.app/api/users/me", { withCredentials : true, headers: { Authorization : `Bearer ${localStorage.getItem("token")}`
            } })
                console.log(res?.data?.data)
                setUser(res?.data?.data)
            } catch (error) {
                if(error?.response?.status === 401){
                    console.warn("User not logged in")
                }
                setUser(null)


            }finally{
                setLoading(false)
            }
        }

        fetchUser()
    }, [])
    return (
        <UserContext.Provider value={{user, setUser, showOtpModal, setShowOtpModal, loading, setLoading}}>
            {children}
        </UserContext.Provider>
    )
}