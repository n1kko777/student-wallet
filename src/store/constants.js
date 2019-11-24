let localhost = "";
if (process.env.NODE_ENV === "development") {
  localhost = "https://127.0.0.1:8000";
}

if (process.env.NODE_ENV === "production") {
  localhost = "https://studwallet.herokuapp.com";
}

const apiURL = "/api/v1";

export const url = `${localhost}`;
export const endpointAPI = `${url}${apiURL}`;
