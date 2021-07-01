import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getOrderApi } from "../Api/order";
import Order from "../components/Orders/order";
import useAuth from "../hooks/useAuth";
import Seo from "../components/Seo";
export default function orders() {
  const [orders, setOrders] = useState(null);
  const { auth, logout } = useAuth();
  // ver como funciona la cantidad de pedidos
  useEffect(() => {
    (async () => {
      const response = await getOrderApi(auth.idUser, logout);
      setOrders(response || []);
    })();
  }, []);
  return (
    <BasicLayout className="orders">
      <Seo title="Mis pedidos" description="Listado de todos tus pedidos " />
      <div className="orders__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              Todavia no has realizado ninguna compra
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

function OrderList(props) {
  const { orders } = props;
  return (
    <Grid>
      {map(orders, (order) => (
        <Grid.Column key={order.id} mobile={16} table={6} computer={8}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  );
}
