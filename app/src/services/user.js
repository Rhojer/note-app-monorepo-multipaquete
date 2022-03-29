import axios from  "axios";
const baseURL = '/api/login/'

const login = (credentials) =>{
    return axios
    .post(baseURL, credentials)
    .then(response=>{
        console.log(response)
        return response
    })
}
const auth = (token) =>{
    
    const config = {
        headers: {
          Authorization: token
        }
      }
    return axios
    .post('/api/auth/','', config)
    .then(response =>{
        return response
    })
}
export default {login, auth}