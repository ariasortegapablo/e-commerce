import React from "react";
import { Pagination as PaginationSU } from "semantic-ui-react";
import { useRouter } from "next/router";
import queryString from "query-string";
//funcion ceil se usa para redondear hacia arriba el entero.
//floor se usa para redondear hacia abajo el entero.
//query string lo que hace es sacar la url
export default function Pagination(props) {
  const { totalGames, page, limitPerPage } = props;

  const totalPages = Math.ceil(totalGames / limitPerPage);
  const router = useRouter();

  const urlParse = queryString.parseUrl(router.asPath);

  const gotoPage = (newPage) => {
    urlParse.query.page = newPage;
    const url = queryString.stringifyUrl(urlParse);
    console.log("yo soy " + url);
    router.push(url);
  };

  return (
    <div className="pagination">
      <PaginationSU
        defaultActivePage={page}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        onPageChange={(_, data) => gotoPage(data.activePage)}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      />
    </div>
  );
}
