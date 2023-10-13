"use client"

import { useEffect, useState } from "react";
import { AxiosError } from "axios";

// axios config
// https://axios-http.com/docs/req_config


const useAxios = (configObj) => {

    // desturction
    const {
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = configObj;

    const [ response, setResponse ] = useState([]);
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(true);
    // button -> send request
    const [ reload, setReload ] = useState(0);
    const refetch = () => setReload(prev => prev + 1);

    // invoke
    useEffect(() => {
        const controller = new AbortController(); // for memory leak

        const fetchData = async () => {
            try {
                const res = await axiosInstance[method.toLowerCase()](url, {
                    ...requestConfig,
                    signal: controller.signal,
                });
                console.log(res);
                setResponse(res.data);
            } catch (err) {
                const errors = err as Error | AxiosError;
                console.log(errors.message);
                setError(errors.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        // useEffect cleanup
        return () => controller.abort(); // for memory leak
    }, [reload]);

    return [response, error, loading, refetch];
}

export default useAxios;