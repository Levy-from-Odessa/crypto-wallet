import axios from 'axios'


const Api = axios.create({
  baseURL: process.env.BASE_URL,
})
// RES
Api.interceptors.response.use(
  (response) => {
    return response.data
  }
)

export default Api
