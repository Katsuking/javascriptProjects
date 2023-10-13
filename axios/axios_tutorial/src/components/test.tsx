"use client"

import useAxios from '@/hooks/useAxios'
import axios from '@/apis/test_api'
import React from 'react'

const Test_api = () => {
    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '',
        requestConfig: { // overwrideもできる
            'Content-Language':'en-US',
        }
    });

    return <article>
        <h3>🔻GET request</h3>
        {loading && <p>loading...</p>}

        {!loading && error && <p>error occured!</p>}

        {!loading && !error && <p>{response?.body}</p>}

        {!loading && !error && !response && <p>No data received!</p>}

        <button onClick={() => refetch()} className='border rounded px-2'>Get</button>

    </article>
}

export default Test_api