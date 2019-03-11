import axios from 'axios';
import { API_VIEW_URL } from '../constants/ApiConstants.js';

export const getStuff = async (params) => {
  try {
    return await axios.get(API_VIEW_URL, { params: params });
  } catch (err) {
    return err;
  }
}
