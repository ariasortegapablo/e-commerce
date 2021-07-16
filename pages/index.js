import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import { getLastGamesApi } from "../Api/game";
import ListGames from "../components/ListGames";
import Seo from "../components/Seo";
// pone game en el return, para que usuario espere la carga de los datos
export default function Home() {
  const [games, setGames] = useState(null);
  console.log(games);
  useEffect(() => {
    (async () => {
      const response = await getLastGamesApi(30);
      //const data = await fetch("/api/games");
      //const response = await data.json();
      console.log(response);
      if (size(response) > 0) setGames(response);
      else setGames([]);
    })();
  }, []);
  return (
    <BasicLayout className="home">
      <Seo />
      {
        //si game es null
        !games && <Loader active>Cargando juegos</Loader>
      }
      {
        // si game tiene contenido vacio
        games && size(games) == 0 && <h1>No hay juegos</h1>
      }
      {
        // si game >0  si hay juegos
        size(games) > 0 && <ListGames games={games} />
      }
    </BasicLayout>
  );
}
