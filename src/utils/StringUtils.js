export const replaceIfNull = (str, replace = '') => {
  return str || replace;
}

export const isNullOrEmpty = (str) => {
  if (str === null || str === '') {
    return true;
  }
  return false;
}

export const isString = value => {
  return typeof value === 'string' || value instanceof String;
}
