import axios from "axios";


// create pre-configured axios instance with your base URL
 const wpApi = axios.create({
  baseURL: import.meta.env.VITE_WORDPRESS_API_URL ,
  auth: {
    username: 'pepper',
    password: 'mammoth'
  },
  headers:{
    'Content-Type': 'application/json',
  },
 });

 export default wpApi;