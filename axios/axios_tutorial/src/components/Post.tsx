"use client"

import axios_instance from "@/apis/axios_instance";
import useAxiosFunc from "@/hooks/useAxiosFunc";

const Post = () => {

  const [response, error, loading, axiosFetch] = useAxiosFunc();

  // const getData = () => {
  //   axiosFetch({
  //     axiosInstance: axios_instance,
  //     method: 'GET',
  //     url: '/posts'
  //   })
  // };

  // useEffect(() => {
  //   getData();
  //   // eslint-disable-next-line
  // }, []);

  const handleSubmit = () => {
    axiosFetch({
      axiosInstance: axios_instance,
      method: 'GET',
      url: '/posts',
      requestConfig: {
        data: {
          title: "Hello World!",
          body: "This is a new post."
        }
      }
    });
  };

  return (
    <>
      <h3>🔻POST</h3>
      {loading && <p>loading...</p>}

      {!loading && error && <p>error occured</p>}

      {!loading && !error && response?.length &&
        <ul>
          {response.map((res, index) => <li key={index}>`${res.title}`</li>)}
        </ul>
      }

      {!loading && !error && !response && <p>No data received!</p>}

      <div>
        <button onClick={handleSubmit} className="border rounded">Submit</button>
        {/* <button onClick={getData} className="border rounded">Refetch</button> */}
      </div>

    </>
  )
}

export default Post
