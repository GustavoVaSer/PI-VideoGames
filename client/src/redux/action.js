import axios from "axios";

export const GET_USERS = "GET_USERS";
const API_KEY = process.env.API_KEY;

export function getUsers() {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/platforms?key=${API_KEY}`
      );
      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error al obtener usuarios:", error);
    }
  };
}
