import { createContext, Dispatch, FunctionComponent, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"

export type ErrorPropsType = {
    status: number,
    message?: string,
}

export type ErrorContextType = {
    setError: Dispatch<SetStateAction<ErrorPropsType | undefined>>
}

export const ErrorContext = createContext<ErrorContextType>({} as ErrorContextType)

export const ErrorPage: FunctionComponent<ErrorPropsType> = ({ status, message }) => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-y-8">
            <h1 className="text-7xl">{status}</h1>
            <p>{message}</p>
        </div>
    )
}

export const ErrorHandler = ({ children }: {children: ReactNode}) => {
    const [error, setError] = useState<ErrorPropsType>()
    const location = useLocation()

    
    useEffect(() => {
        setError(undefined)
    }, [location.pathname])
    
    const value = useMemo(() => ({
        setError
    }), [setError])
    
    if (error) {
        return <ErrorPage {...error} />
    }

    return (
        <ErrorContext.Provider value={value}>
            {children}
        </ErrorContext.Provider>
    )
}

export const useError = () => useContext(ErrorContext);