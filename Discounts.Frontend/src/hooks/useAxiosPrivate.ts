import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";

const useAxiosPrivate = () => {
    // const accessToken = localStorage.getItem("access");

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxYzQxMmI5ZS01NDM5LTRiYzgtYTY2Ny0wNWViNTdhN2E3MWUiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJuYmYiOjE3MDA2MTgyMjYsImV4cCI6MTcwMDYyMTgyNiwiaWF0IjoxNzAwNjE4MjI2LCJpc3MiOiJEaXNjb3VudHMiLCJhdWQiOiJEaXNjb3VudHMifQ.YodUf-eGT-dgVNbWQRfQRLkiNYVYYp6JtEHnkhFFJGg`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, []);

    return axiosPrivate;
};

export default useAxiosPrivate;