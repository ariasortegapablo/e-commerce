import { getToken, hasExpiredToken } from "../Api/token";
//aironsession
//nextauth
export async function authFetch(url, params, logout) {
  console.log("yo soy params" + params);
  const token = getToken();

  // si token es nulo
  if (!token) {
    //Usuario no logeado
    logout();
  } else {
    if (hasExpiredToken(token)) {
      //token caducado
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        console.log(error.url);
        return error;
      }
    }
  }
}
