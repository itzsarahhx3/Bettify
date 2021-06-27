import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    // runs every time the code changes
    useEffect(() => {
        axios
            .post("http://localhost:3001/login", {
                code
            })
            .then((res) => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);
                // remove token code in the search bar
                // The code that's returned as a query parameter to the redirect URI
                window.history.pushState({}, null, "/");
            })
            .catch(() => {
                window.location = "/";
            });
    }, [code]);

    // whenever refreshToken & expiresIn is changed
    useEffect(() => {
        // refreshToken is undefined? render immediately when click
        if (!refreshToken || !expiresIn) return;
        const timeout = setInterval(() => {
            axios
                .post("http://localhost:3001/refresh", {
                    refreshToken
                })
                .then((res) => {
                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn);
                })
                .catch(() => {
                    window.location = "/";
                });
            // timer: refresh 1 minute before expires
        }, (expiresIn - 60) * 1000);

        // make sure we don't use refreshToken
        return () => clearInterval(timeout);
    }, [refreshToken, expiresIn]);

    return accessToken;
}
