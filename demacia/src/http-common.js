import axios from 'axios'
export default axios.create({
  baseURL: 'http://localhost:8081/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
