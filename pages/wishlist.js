import React, { useState, useEffect } from "react";
import { size, forEach } from "lodash";
import { getFavoriteApi } from "../Api/favorite";
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout";
import ListGames from "../components/ListGames";
import { Loader } from "semantic-ui-react";
import Seo from "../components/Seo";
export default function wishlist() {
  const [games, setGames] = useState(null);
  const { auth, logout } = useAuth();
  console.log(games);
  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      if (size(response) > 0) {
        const gamesList = [];
        forEach(response, (data) => {
          gamesList.push(data.game);
        });
        setGames(gamesList);
      } else {
        setGames([]);
      }
    })();
  }, []);
  return (
    <BasicLayout className="wishlist">
      <Seo title="Lista de favoritos" />
      <div className="wishlist__block">
        <div className="title">Lista de deseos</div>

        <div className="data">
          {!games && <Loader active>Cargando juegos </Loader>}
          {games && size(games) === 0 && (
            <div className="data__not-found">
              <h3>No tienes juegos en tu lista</h3>
            </div>
          )}
          {size(games) > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  );
}
