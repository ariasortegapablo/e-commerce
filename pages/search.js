import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { searchGamesApi } from "../Api/game";
import ListGames from "../components/ListGames";
import Seo from "../components/Seo";

// size sirve para letras arrays etc
//primero siempre importaciones de componentes instalados y luego los propios
// problemas con componentes que no esta controlado
export default function search() {
  const [games, setGames] = useState(null);
  const data = useRouter();
  const { query } = data;
  useEffect(() => {
    document.getElementById("search-game").focus();
  }, []);
  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchGamesApi(query.query);
        if (size(response) > 0) {
          setGames(response);
          console.log(response);
        } else {
          setGames([]);
        }
      } else {
        setGames([]);
      }
    })();
  }, [query]);
  return (
    //size del null es cero
    <BasicLayout className="search">
      <Seo title={`Buscando: ${query.query}`} />
      {!games && <Loader active>Cargando el juego</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h1>No se han encontrado juegos</h1>
        </div>
      )}
      {console.log(games)}
      {size(games) > 0 && <ListGames games={games}></ListGames>}
    </BasicLayout>
  );
}
