export const setProfile = (data) => {
  return localStorage.setItem('x-tt-profiles', JSON.stringify(data));
};

export const getProfile = () => {
  const profiles = localStorage.getItem('x-tt-profiles');
  if (profiles) return JSON.parse(profiles);
  else return null; 
};

export const setToken = (data) => {
  return localStorage.setItem('token', JSON.stringify(data));
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  if (token !== undefined) return JSON.parse(token);
  else return null;
};

const JWT = {
  setProfile,
  getProfile,
  setToken,
  getToken
};

export default JWT;