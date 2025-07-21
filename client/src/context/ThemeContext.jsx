import { createContext, useEffect, useReducer } from "react"



const initialState = {
    theme : "light"
}

const themeReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_THEME":
            return {
                theme : state.theme == "light" ? "dark" : "light"
            }
        default:
            return state
    }
}

export const ThemeContext = createContext()

export const ThemeProvider = ({children})  => {
    const [state, dispatch] = useReducer(themeReducer, initialState)

    useEffect(() => {
        if(state.theme === "dark"){
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
        localStorage.setItem("theme" , state.theme)
    }, [state.theme])

    const toogleTheme = () => {
        dispatch({type : "TOGGLE_THEME"})
        // document.documentElement.classList.toggle("dark")
    };

    return (
        <ThemeContext.Provider value = {{theme: state.theme, toogleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}