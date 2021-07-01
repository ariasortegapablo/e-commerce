import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import { getGameByUrlApi } from "../Api/game";
import HeaderGame from "../components/Game/HeaderGame";
import TabsGame from "../components/Game/TabsGame";
import Seo from "../components/Seo";
// para reproducir videos etc, se necesita react-player,renderice el video apartir de una url
export default function Game() {
  const { query } = useRouter();
  console.log(query);
  const [game, setGame] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);
      console.log(response);
      setGame(response);
    })();
  }, [query]);

  if (!game) return null;
  return (
    <BasicLayout className="game">
      <Seo title={game.title} />
      <HeaderGame game={game} />
      <TabsGame game={game} />
    </BasicLayout>
  );
}
