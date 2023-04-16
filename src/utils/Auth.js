import axios from "axios";

const auth = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER}`,
});

const setAuthToken = (token) => {
  if (token) {
    auth.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("tokenGeneratedAt", new Date().getTime());
  } else {
    delete auth.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenGeneratedAt");
  }
};

const loadToken = () => {
  const token = sessionStorage.getItem("token");
  const tokenGeneratedAt = sessionStorage.getItem("tokenGeneratedAt");

  if (!token || !tokenGeneratedAt) {
    return null;
  }

  const tokenAge = (new Date().getTime() - tokenGeneratedAt) / 1000;
  const tokenMaxAge = 60 * 60; // 1 hour

  if (tokenAge > tokenMaxAge) {
    setAuthToken(null);
    return null;
  }

  if (tokenAge > (tokenMaxAge - 5 * 60)) { // less than 5 minutes until token expiration
    renewToken(token);
  }

  return token;
};

const renewToken = async (token) => {
  try {
    const response = await auth.post("/user/renewToken");
    const newToken = response.data.token;
    setAuthToken(newToken);
    return newToken;
  } catch (error) {
    console.error(error);
  }
};

const login = async (username, password) => {
  try {
    const response = await auth.post("/user/authenticate", { "username":username, "password":password });
    const token = response.data.token;
    setAuthToken(token);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const checkToken = async () => {
  try {
    await auth.get("/user/check");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { setAuthToken, renewToken, login, checkToken, loadToken };
export default auth;