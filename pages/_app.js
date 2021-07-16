import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { setToken, getToken, removeToken } from "../Api/token";
import {
  getProductsCart,
  addProductCart,
  countProductsCart,
  removeProductCart,
  removeAllProductsCart,
} from "../Api/cart";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// se importan de manera global para toda la aplicacion

//este el fichero que siempre se ejecuta

//Cuando queremos adicionar un producto al carrito es necesario usar el token, auth sigo como undefined, analizar.

//El sistema de interruptor
export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadUser, setReloadUser] = useState(false);
  //EL sistema del interruptor
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();
  console.log(totalProductsCart);
  useEffect(async () => {
    const response = await fetch("/api/games");
    const data = await response.json();
    console.log(data);
  }, []);
  useEffect(() => {
    console.log("me renderice");
    //si no hay va devolver null
    const token = getToken();
    if (token) {
      //Establecemos los nuevos datos del usuario
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    console.log("app otra vez");
    setReloadUser(false);
  }, [reloadUser]);
  // despues del setTotalProductCard la page no se vuelve a renderizar
  useEffect(() => {
    setTotalProductsCart(countProductsCart);
    setReloadCart(false);
  }, [reloadCart, auth]);
  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };
  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };
  //Para que sea accesible desde cualuier usuario
  //useMemo solo se actualiza cuando se cambiar las variables especificas dentro de este
  const authData = useMemo(
    () => ({
      //auth es un objeto
      auth,
      //login es una funcion
      login,
      //logout es una funcion
      logout,
      //setReloadUser es una funcion
      setReloadUser,
    }),
    [auth]
  );
  //funcion para adicionar productos al carrito para verificar que el usuario este logeado
  const addProduct = (product) => {
    if (auth) {
      addProductCart(product);
      setReloadCart(true);
    } else {
      toast.warning("usted no ha iniciado sesion");
    }
  };

  const removeProduct = (product) => {
    removeProductCart(product);
    // cada que remueve un producto se recarga la pagina
    setReloadCart(true);
  };
  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (url) => addProduct(url),
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: removeAllProductsCart,
    }),
    [totalProductsCart, auth]
  );
  // necesitamos saber si el usuario esta logeado o no,undefined no sirve , esa es la razon de de esta linea.
  if (auth === undefined) return null;
  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          CloseOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
