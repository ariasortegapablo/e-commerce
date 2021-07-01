import { SearchResults } from "semantic-ui-react";
import { BASE_PATH } from "../utils/constans";
import { authFetch } from "../utils/fetch";

export async function getOrderApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/orders?_sort=createdAt:desc&user=${idUser}`;
    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
