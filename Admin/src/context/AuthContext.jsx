import { createContext, useContext, useReducer } from "react";


const initial_state = {
    user : null
}


const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user : action.payload
            }
        case "LOGOUT":
            return {
                user : null
            }
    
        default:
            return state;
    }
}
export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initial_state)

    return (
        <AuthContext.Provider value={{user : state.user, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
