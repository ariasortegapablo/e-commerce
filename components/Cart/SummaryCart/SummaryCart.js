import React, { useState, useEffect } from "react";
import { Table, Image, Icon } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hooks/useCart";

// analizar porque aparece en 0
export default function SummaryCart(props) {
  const { products, reloadCart, setReloadCart } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const { removeProductCart } = useCart();

  console.log(products);
  //Este useEffect es solo para el precio
  //le quite el ReloadCart
  useEffect(() => {
    let price = 0;
    forEach(products, (product) => {
      price += product.price;
    });
    setTotalPrice(price);
  }, [products]);

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };
  return (
    <div className="summary-cart">
      {console.log("yo soy " + totalPrice)}
      <div className="title">Resumen del carrito</div>
      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Plataforma</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => (
              <Table.Row key={product.id} className="summary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product.url)}
                  />
                  <Image src={product.poster[0].url} alt={product.title} />
                  {product.title}
                </Table.Cell>
                <Table.Cell>{product.platform.title}</Table.Cell>
                <Table.Cell>Inmediato</Table.Cell>
                <Table.Cell>{product.price}$USD</Table.Cell>
              </Table.Row>
            ))}

            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear"></Table.Cell>
              <Table.Cell colSpan="2">Total</Table.Cell>
              <Table.Cell className="total-price">
                {totalPrice.toFixed(2)}$USD
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
//precio porque no cambiaba
//porque al quitar no rerenderizaba
//carrito  de suma.
