import {axiosPrivate, axiosPublic} from "../api/axios";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";


interface Token {
    nameid: string
}

const refreshRequest = () => {
    useEffect(() => {
        const refresh = localStorage.getItem('refreshToken');
        axiosPublic.post("http://localhost:8080/api/Account/refresh-token", refresh).then((resp: any) => {
            const {accessToken, refreshToken} = resp.data;
            const token:Token = jwtDecode(accessToken);
            localStorage.setItem('userId', JSON.stringify(token.nameid))
            localStorage.setItem('accessToken', JSON.stringify(accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
        })
    })
}

const useAxiosPrivate = () => {
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`;
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
                    refreshRequest();
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