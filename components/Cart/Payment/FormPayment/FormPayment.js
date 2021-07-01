import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { size } from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import { paymentCartApi } from "../../../../Api/cart";
export default function FormPayment(props) {
  const { products, address } = props;
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { auth, logout } = useAuth();
  const { removeAllProductsCart } = useCart();
  const router = useRouter();

  const handleSubmit = async (event) => {
    //Evita que se recargue la pagina
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const results = await stripe.createToken(cardElement);

    if (results.error) {
      toast.error(results.error.message);
    } else {
      const response = await paymentCartApi(
        results.token,
        products,
        auth.idUser,
        address,
        logout
      );
      if (size(response) > 0) {
        toast.success("Pedido completado");
        removeAllProductsCart();
        router.push("/orders");
      } else {
        toast.error("Error al realizar el pedido");
      }
    }
    setLoading(false);
  };
  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" loading={loading} disabled={!stripe}>
        Pagar
      </Button>
    </form>
  );
}
