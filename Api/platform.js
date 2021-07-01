import { BASE_PATH } from "../utils/constans";

export async function getPlatformsApi() {
  try {
    // ordenar de manera ascendente
    const url = `${BASE_PATH}/platforms?_sort=position:asc`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
