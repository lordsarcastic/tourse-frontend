import axios from "axios"
import { createContext, ReactNode, useContext, useEffect, useMemo } from "react"
import LoginPage from "./pages/Login"
import { VERIFY_TOKEN } from "./routes"
import { LocalStorageUserType } from "./types"

export type AuthContextType = {
    isLoggedIn: () => boolean,
    logout: () => void
    login: (paylod: LocalStorageUserType) => void
    // login
}

const verifyToken = async (token: string): Promise<boolean> => {
    const res = await axios.post(VERIFY_TOKEN)
    return res.status % 200 < 200
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
    const login = (payload: LocalStorageUserType) => {
        localStorage.setItem("user", JSON.stringify(payload))
    }

    const logout = () => {
        localStorage.removeItem("user")
    }

    const isLoggedIn = (): boolean => {
        const stringifiedUser = localStorage.getItem("user")
        if (stringifiedUser) {
            return false;
        }

        const user: LocalStorageUserType = JSON.parse(stringifiedUser!);
        let result = false;
        verifyToken(user.access_token)
            .then(value => {
                result = value;
            })
        console.log({result})
        return result
    }

    const value = useMemo(() => ({
        login,
        logout,
        isLoggedIn
    }), [login, logout, isLoggedIn])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useLoggedIn = () => {
    const { isLoggedIn } = useContext(AuthContext)
    useEffect(() => {
        if (!isLoggedIn) {
            window.location.href = LoginPage.route
        }
    }, [])

    return
}