import React, { useState, useEffect } from "react";
import { Container, Grid, GridColumn, Image, Input } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function TopBar() {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <GridColumn width={8} className="top-bar__left">
            <Logo />
          </GridColumn>
          <GridColumn width={8} className="top-bar__right">
            <Search />
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
}

function Logo() {
  //Es necesario envolver la imagen dentro de una a
  return (
    <Link href="/">
      <a>
        <Image src="/logo.png" alt="Gaming" />
      </a>
    </Link>
  );
}
function Search() {
  // que lea espacios
  const [searchStr, setSearchStr] = useState("");
  const router = useRouter();
  const [load, setLoad] = useState(false);
  //La primera ejecucion del useEffect la vamos a bloquear
  // directament sacamos de la query
  useEffect(() => {
    if (load) {
      router.push(`/search?query=${searchStr}`);
    }
    setLoad(true);
  }, [searchStr]);

  return (
    <Input
      id="search-game"
      icon={{ name: "search" }}
      value={router.query.query}
      onChange={(_, data) => setSearchStr(data.value)}
    />
  );
}
