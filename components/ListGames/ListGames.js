import React from "react";
import { map } from "lodash";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
// El key id en esta page realmente por ahora no tiene utilidad, solamente es para quitarle el error
import {
  breakpointUpSm,
  breakpointUpMd,
  breakpointUpLg,
} from "../../utils/breakpoint";
export default function ListGames(props) {
  const { games } = props;

  return (
    <div className="list-games">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(games, (game) => (
            <Game game={game} key={game.id} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

function getColumnsRender() {
  const { width } = useWindowSize();

  switch (true) {
    case width > breakpointUpLg:
      return 5;
    case width > breakpointUpMd:
      return 3;
    case width > breakpointUpSm:
      return 2;
    default:
      return 1;
  }
}

function Game(props) {
  const { game } = props;
  //console.log(game);
  // En grid column igual quedaria muy bien
  //  mobile={16}
  //tablet={8}
  //computer={3}
  // esa rayita en el href hace que cuando ejecutemos un juego desde un plataforma el href ->
  // corra desde el base path
  return (
    <Grid.Column className="list-games__game">
      <Link href={`/${game.url}`}>
        <a>
          <div className="list-games__game-poster">
            <Image src={game.poster[0].url} alt={game.title} />
            <div className="list-games__game-poster-info">
              {game.discount ? (
                <span className="discount">-{game.discount}%</span>
              ) : (
                <span></span>
              )}
              <span className="price"> {game.price} $USD</span>
            </div>
          </div>

          <h2> {game.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
}
