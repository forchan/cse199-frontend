import axios from 'axios';
import { API_VIEW_URL } from '../constants/ApiConstants.js';

export const fetchAllInstructors = async () => {
  try {
    return axios.get(`${API_VIEW_URL}?action=getInstructorList`);
  } catch (err) {
    return err;
  }
}
