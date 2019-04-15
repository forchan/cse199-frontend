import axios from 'axios';
import { API_VIEW_URL } from '../constants/ApiConstants.js';

// main function for making api get calls
export const getStuff = async (params) => {
  try {
    return await axios.get(API_VIEW_URL, { params: params });
  } catch (error) {
    return error;
  }
}

// main function for making post calls
// returns a string that describes success or error
export const postApiStuff = async (url, params) => {
  try {
    let { data } = await axios.post(url, JSON.stringify(params));
    return data.Status; // returns string
  } catch (error) {
    return `${error}`; // template literal converts error from some weird object to string
  }
}
