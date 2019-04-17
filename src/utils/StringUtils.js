export const replaceIfNull = (str, replace = '') => {
  return str || replace;
};

export const isNullOrEmpty = (str) => {
  if (str === null || str === '') {
    return true;
  }
  return false;
};

export const isString = value => {
  return typeof value === 'string' || value instanceof String;
};

// used to validate if data.Status has good news or bad news
export const validateResponseString = response => {
  if (!response || !isString(response)) return false; // empty or not string

  // postApiStuff returns a string that will contain "error" if there is one
  if (response.toLowerCase().includes('error')) return false;

  // we must look for "success" inorder to be 100% sure
  if (response.toLowerCase().includes('success')) return true;

  // defaults to false
  return false;
};
