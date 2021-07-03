import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getGameByUrlApi } from "../Api/game";
import useCart from "../hooks/useCart";
import SummaryCart from "../components/Cart/SummaryCart";
import AddressShipping from "../components/Cart/AddressShipping";
import Payment from "../components/Cart/Payment";
import { useRouter } from "next/router";
// crear el localStorage personal
// en Udemy recien cuando le das en el añadir a la cesta te aparece el modal de logearte.
// Cuando el usuario selecciona una direccion aparece el metodo de pago
import useAuth from "../hooks/useAuth";
import { product } from "platform";
export default function cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();
  const { auth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth) {
      router.push("/");
    }
  }, []);

  if (!auth) return null;
  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>No hay productos en el carrito</h2>
    </BasicLayout>
  );
}
function FullCart(props) {
  const { products } = props;
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [address, setAddress] = useState(null);
  console.log(productsData);
  //Este useEffec para obtener la nueva cantidad de productos
  useEffect(() => {
    {
      console.log("Cartttttttttt");
    }

    (async () => {
      const productsTemp = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productsTemp.push(data);
      }
      setProductsData(productsTemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  return (
    <BasicLayout className="full-cart">
      <SummaryCart
        products={productsData}
        setReloadCart={setReloadCart}
        reloadCart={reloadCart}
      />
      <AddressShipping setAddress={setAddress} />
      {address && <Payment products={productsData} address={address} />}
    </BasicLayout>
  );
}
