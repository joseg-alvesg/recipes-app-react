export const setUser = (key, value) => {
  const valueToStore = JSON.stringify({ [key]: value });
  localStorage.setItem('user', valueToStore);
};
