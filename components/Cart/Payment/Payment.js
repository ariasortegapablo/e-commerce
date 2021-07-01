import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_TOKEN } from "../../../utils/constans";
import FormPayment from "./FormPayment";
//Acuerdo de cobro
const StripePromise = loadStripe(STRIPE_TOKEN);
//se creo una nueva constante
export default function Payment(props) {
  const { products, address } = props;
  return (
    <div className="payment">
      <div className="title"> Pago</div>
      <div className="data">
        <Elements stripe={StripePromise}>
          <FormPayment products={products} address={address} />
        </Elements>
      </div>
    </div>
  );
}
