import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button, GridColumn } from "semantic-ui-react";
import { size } from "lodash";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../../Api/favorite";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import classNames from "classnames";

//fluid es para que ocupe el ancho del 100%
//la clase like para que el corazon cambie de color
//Si hay un etiqueta html en el summary de stripe, es mejor leer la etiqueta no el texto

export default function HeaderGame(props) {
  const { game } = props;
  const { poster, title } = game;

  return (
    <Grid className="header-game">
      <GridColumn mobile={16} tablet={6} computer={5}>
        <Image src={poster[0].url} alt={title} fluid />
      </GridColumn>
      <GridColumn mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </GridColumn>
    </Grid>
  );
}
function Info(props) {
  const { game } = props;
  const { title, summary, price, discount, url } = game;
  const [isFavorite, setIsFavorite] = useState(false);
  const { auth, logout } = useAuth();
  const [realoadFavorite, setReloadFavorite] = useState(false);
  const { addProductCart } = useCart();
  console.log(isFavorite);
  // es necesario que le den like y dislike en la misma pagina
  useEffect(() => {
    if (auth) {
      (async () => {
        const response = await isFavoriteApi(auth.idUser, game.id, logout);
        if (size(response) > 0) setIsFavorite(true);
        else setIsFavorite(false);
      })();
      setReloadFavorite(false);
    }
  }, [game, realoadFavorite]);

  const addFavorite = async () => {
    // si el usuario existe
    if (auth) {
      await addFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };
  const deleteFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {title}
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          className={classNames({
            like: isFavorite,
          })}
          link
          onClick={isFavorite ? deleteFavorite : addFavorite}
        />
      </div>
      <div className="header-game__delivery">Entrega en 24/48 horas</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      ></div>
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Precio de venta al publico: {price} $USD</p>
          <div className="header-game__buy-actions">
            <p> - {discount}%</p>
            <p>
              {" "}
              {(price - Math.floor(price * discount) / 100).toFixed(2)}$USD
            </p>
          </div>
        </div>
        <Button
          className="header-game__buy-btn"
          onClick={() => addProductCart(url)}
        >
          Añadir a la cesta
        </Button>
      </div>
    </>
  );
}
