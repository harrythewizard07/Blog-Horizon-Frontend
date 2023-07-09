// isLoggedIn ? -> if local storage contains token, then logged in

export const isLoggedIn = () => {
  let data = localStorage.getItem("data");

  if (data != null) {
    return true;
  } else {
    return false;
  }
};

// doLogin -> sets a token to lacal storage to login a user

export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// doLogout -> removes data from local storage to logout user

export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

// getCurrentUser -> gets the data of the logged in user

export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).userDto;
  } else {
    return undefined;
  }
};

//  getToken -> gets the JWT token of the logged in user

export const getToken = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).token;
  } else {
    return null;
  }
};
