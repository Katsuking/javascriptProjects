import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts/1";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});