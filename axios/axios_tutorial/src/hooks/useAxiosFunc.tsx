"use client"

import { useEffect, useState } from "react";
import { AxiosError } from "axios";

// axios config
// https://axios-http.com/docs/req_config

const useAxiosFunc = () => {

    const [ response, setResponse ] = useState([]);
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    // button -> send request
    const [ Controller, setController ] = useState();

    const axiosFetch = async (configObj) => {
        // desturction
        const {
            axiosInstance,
            method,
            url,
            requestConfig = {}
        } = configObj;

        try {
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);

            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                signal: ctrl.signal,
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

    // invoke
    useEffect(() => {
        console.log(Controller);
        // useEffect cleanup
        return () => Controller && Controller.abort(); // for memory leak
    }, [Controller]);

    return [response, error, loading, axiosFetch];
}

export default useAxiosFunc;