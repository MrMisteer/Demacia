// src/http-common.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // ✅ essentiel pour que les cookies soient envoyés
})

export default instance
