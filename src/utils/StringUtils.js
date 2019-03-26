export const replaceIfNull = (str, replace = '') => {
  return str || replace;
}

export const isNullOrEmpty = (str) => {
  if (str === null || str === '') {
    return true;
  }
  return false;
}
