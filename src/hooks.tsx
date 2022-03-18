import { useEffect } from "react";
import { useError } from "./Error";

export const useErrorHook = (error: Error | undefined) => {
    const { setError } = useError();
    useEffect(() => {
        error && console.log(error.stack);
        error &&
            setError({
                status: 300,
                message: error.message,
            });
    }, [error, setError]);
};
