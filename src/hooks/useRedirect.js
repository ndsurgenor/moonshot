import { useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';


export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post("/dj-rest-auth/token/refresh/");
                // User logged in
                if (userAuthStatus === "signedIn") {
                    history.push("/");
                }
            } catch (err) {
                // User not logged in
                if (userAuthStatus === "signedOut") {
                    history.push("/");
                }
            }
        };
        handleMount();
    }, [history, userAuthStatus]);
};