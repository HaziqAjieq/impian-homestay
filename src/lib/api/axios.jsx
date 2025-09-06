import axios from "axios";


// create pre-configured axios instance with your base URL
 const wpApi = axios.create({
  baseURL: import.meta.env.VITE_WORDPRESS_API_URL || 'http://impian-homestay.local/wp-json',
  headers:{
    'Content-Type': 'application/json',
  },
 });

 export default wpApi;