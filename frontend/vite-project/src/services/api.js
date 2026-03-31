import axios from "axios";

const API = axios.create({
    // baseURL:"http://localhost:5000/api"
    baseURL:"http://192.168.1.8:5000/api"
})

export default API;