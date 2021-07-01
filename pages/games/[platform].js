import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { useRouter } from "next/router";
import { getGamesPlatformApi, getTotalGamesPlatformApi } from "../../Api/game";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import ListGames from "../../components/ListGames";
import Pagination from "../../components/Pagination";
import Seo from "../../components/Seo";

//use router es para saber en que pagina estas
//UID de strapi es para campos unicos
//En la url añadirle el tipo de juego
// cuando usas ruta dinamica [] no se vuelve a renderizar.
const limitPerPage = 15;
// cuando se entra directamente a un page y es dinamica en el primer render no sabe a cual corresponde.
// para hacer la paginacion es necesario la pagina y el total de juegos
//query - string sirve para transforma query en string y string en query
export default function Platform() {
  const { query } = useRouter();
  const a = useRouter();
  const [games, setGames] = useState(null);
  const [totalGames, setTotalGames] = useState(null);
  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    //!query.page es para que cuando query no exista retorne 0
    if (!query.page || currentPage === 1) return 0;
    else return currentPage * limitPerPage - limitPerPage;
  };
  console.log(a);
  console.log(a.pathname);
  console.log(games);
  useEffect(() => {
    (async () => {
      if (query.platform) {
        const response = await getGamesPlatformApi(
          query.platform,
          limitPerPage,
          getStartItem()
        );
        setGames(response);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      const response = await getTotalGamesPlatformApi(query.platform);
      setTotalGames(response);
    })();
  }, [query]);
  return (
    <BasicLayout className="platform">
      <Seo title={query.platform} />
      {!games && <Loader active>Cargando juegos </Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
      {totalGames ? (
        <Pagination
          totalGames={totalGames}
          pages={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
