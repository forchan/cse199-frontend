import axios from 'axios';
import { API_VIEW_URL } from '../constants/ApiConstants.js';
import { isString } from '../utils/StringUtils.js';

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

// used to validate if data.Status has good news or bad news
export const validateResponse = response => {
  if (!response || !isString(response)) return false; // empty or not string

  // postApiStuff returns a string that will contain "error" if there is one
  if (response.toLowerCase().includes('error')) return false;

  // we must look for "success" inorder to be 100% sure
  if (response.toLowerCase().includes('success')) return true;

  // defaults to false
  return false;
}
