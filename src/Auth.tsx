import axios from "axios";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from "./constants";
import { useError } from "./Error";
import LoginPage from "./pages/Login";
import { client } from "./requests";
import { BASE_URL, REFRESH_TOKEN, VERIFY_TOKEN } from "./routes";
import { LocalStorageUserType } from "./types";

export type AuthContextType = {
    isLoggedIn: () => boolean;
    getAuthToken: () => LocalStorageUserType | undefined;
    logout: () => void;
    login: (paylod: LocalStorageUserType) => void;
    updateAccessToken: (token: string) => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
    const loginFunction = (payload: LocalStorageUserType) => {
        localStorage.setItem(
            AUTH_TOKEN_LOCAL_STORAGE_KEY,
            JSON.stringify(payload)
        );
    };

    const logoutFunction = () => {
        localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
    };

    const getAuthTokenFunction = (): LocalStorageUserType | undefined => {
        const token = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
        if (!token) {
            return undefined;
        }
        return JSON.parse(token);
    };

    const updateAccessTokenFunction = (token: string) => {
        const payload = getAuthTokenFunction();
        if (payload) {
            payload.access = token;
            loginFunction(payload);
        }
    };

    const loggedIn = (): boolean => {
        const authToken = getAuthToken();
        return Boolean(authToken);
    };

    const authClient = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${getAuthTokenFunction()?.access}`,
        },
    });

    const isLoggedIn = useCallback(loggedIn, [loggedIn]);
    const login = useCallback(loginFunction, [loginFunction]);
    const logout = useCallback(logoutFunction, [logoutFunction]);
    const getAuthToken = useCallback(getAuthTokenFunction, [
        getAuthTokenFunction,
    ]);
    const updateAccessToken = useCallback(updateAccessTokenFunction, [
        updateAccessTokenFunction,
    ]);

    const value = useMemo(
        () => ({
            login,
            logout,
            authClient,
            getAuthToken,
            isLoggedIn,
            updateAccessToken,
        }),
        [login, logout, isLoggedIn, getAuthToken, updateAccessToken, authClient]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useLoggedIn = () => {
    const { isLoggedIn, getAuthToken, updateAccessToken, logout } =
        useContext(AuthContext);
    const { setError } = useError();
    const navigate = useNavigate();
    const [toNavigate, setToNavigate] = useState<boolean | undefined>();

    useEffect(() => {
        if (!isLoggedIn()) {
            console.log("Not logged in");
            setToNavigate(true);
        } else {
            console.log("Logged in");
            client
                .post(VERIFY_TOKEN, { token: getAuthToken()!.access })
                .then(() => {
                    console.log("Verified token");
                    setToNavigate(false);
                })
                .catch((err) => {
                    console.log({ ...err });
                    if (err.response.status !== 401) {
                        setError({
                            status: { ...err }.status,
                            message: { ...err }.message,
                        });
                    } else {
                        console.log("Token expired");
                        client
                            .post(REFRESH_TOKEN, {
                                refresh: getAuthToken()!.refresh,
                            })
                            .then((res) => {
                                updateAccessToken(res.data.access);
                                setToNavigate(false);
                            })
                            .catch((err) => {
                                if (err.response.status !== 401) {
                                    setError({
                                        status: { ...err }.status,
                                        message: { ...err }.message,
                                    });
                                } else {
                                    setToNavigate(true);
                                }
                            });
                    }
                });
        }
        if (toNavigate) {
            console.log("Navigating to login");
            logout();
            navigate(LoginPage.route);
        }
    }, [
        isLoggedIn,
        logout,
        getAuthToken,
        navigate,
        setError,
        toNavigate,
        updateAccessToken,
    ]);

    return;
};
