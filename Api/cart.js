import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constans";
import { authFetch } from "../utils/fetch";

// antes de añadir hizo el get, para ver si habia productos en el carrito.
// todo el carrito se va gestionar en localStorage
export function getProductsCart() {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    return null;
  } else {
    const products = cart.split(",");
    return products;
  }
}

export function addProductCart(product) {
  const cart = getProductsCart();
  if (!cart) {
    localStorage.setItem(CART, product);
  } else {
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("El elemento ya esta en el carrito");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("Producto añadido correctamente");
    }
  }
}
export function countProductsCart() {
  const cart = getProductsCart();
  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}

export function removeProductCart(product) {
  const cart = getProductsCart();
  remove(cart, (item) => {
    return item === product;
  });

  if (size(cart) > 0) {
    localStorage.setItem(CART, cart);
  } else {
    localStorage.removeItem(CART);
  }
}
export async function paymentCartApi(token, products, idUser, address, logout) {
  try {
    const addressShipping = address;
    //probar eleminar de un objeto de esta forma
    delete addressShipping.user;
    delete addressShipping.createAt;

    const url = `${BASE_PATH}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        products,
        idUser,
        addressShipping,
      }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function removeAllProductsCart() {
  localStorage.removeItem(CART);
}
