import axios from "axios";
// const baseURL = 'https://arcane-springs-44654.herokuapp.com/api/notes'
const baseURL = '/api/notes/'

const getNotes = () => {
  return axios
    .get(baseURL)
    .then((response) => {
      return response.data;
    });
};
const addNote= (addNote, token) => {
    const config = {
    headers: {
      Authorization: token
    }
  }
  return axios
    .post(baseURL, addNote, config)
    .then((response) => {
      return response.data;
    });
};
const deleteNote = (id)=>{
  return axios
    .delete(baseURL+id)
    .then((response) => {
      return response.data;
    });
}

export default {deleteNote, addNote, getNotes}