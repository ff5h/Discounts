import {axiosImage, axiosPublic} from "../api/axios";
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

const useAxiosImage = () => {
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const requestIntercept = axiosImage.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosImage.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    refreshRequest();
                    return axiosImage(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosImage.interceptors.request.eject(requestIntercept);
            axiosImage.interceptors.response.eject(responseIntercept);
        };
    }, []);

    return axiosImage;
};

export default useAxiosImage;