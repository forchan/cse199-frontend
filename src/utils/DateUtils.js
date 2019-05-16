export const getCurrentYear = () => {
  return (new Date()).getFullYear();
};

export const getNextYears = (numberOfYears) => {
  const year = getCurrentYear();
  return Array.from(new Array(numberOfYears), (value, index) => index + year);
};
