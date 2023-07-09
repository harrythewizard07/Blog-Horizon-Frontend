import { myAxios, privateAxios } from "./helper";

//registering user
export const signUp = (user) => {
  return myAxios.post("/auth/register", user).then((response) => response.data);
};

//logging in user
export const login = (loginDetail) => {
  return myAxios
    .post("/auth/login", loginDetail)
    .then((response) => response.data);
};

//get user by userId
export const getUserById = (userId) => {
  return myAxios.get(`/users/${userId}`).then((response) => response.data);
};

//update user data
export const updateUserService = (user, userId) => {
  return privateAxios
    .put(`/users/${userId}`, user)
    .then((response) => response.data);
};
