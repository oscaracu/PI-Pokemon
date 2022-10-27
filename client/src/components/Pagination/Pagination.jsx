import styled from "styled-components";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

// Aqui creamos un rango de numeros

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const PaginationDiv = styled.div`
  font-family: "Fredoka", sans-serif;

  nav {
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;

      .active {
        background-color: #2980b9;
        color: #ecf0f1;
      }

      button {
        color: #2980b9;
        border: none;
        background-color: #ecf0f1;
        font-family: inherit;
        font-weight: 500;
        font-size: 1.25em;
        padding: 8px 16px;

        :hover {
          background-color: #2980b9;
          color: #ecf0f1;
        }
      }
    }
  }
`;

const Pagination = (props) => {
  //   const state = { currentPage: 1 };

  //   const [currentPage, setCurrentPage] = useState(1);

  const {
    totalRecords,
    pageLimit,
    pageNeighbours,
    currentPage,
    prev,
    next,
    history,
    querys,
  } = props;

  const currentPageLimit = typeof pageLimit === "number" ? pageLimit : 12;
  const currentTotalRecords =
    typeof totalRecords === "number" ? totalRecords : 0;

  // pageNeighbours se refiere a los "vecinos" de nuestra página actual... p. ej: si estamos en la pag 5, sus neighbours serán 4 y 6... podemos poner hasta 2
  const currentNeighbours =
    typeof pageNeighbours === "number"
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;

  const totalPages = Math.ceil(currentTotalRecords / currentPageLimit);

  // Aqui generamos los numeros de página

  function fetchPageNumbers(totalPages, currentPage, pageNeighbours) {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      // Aqui se determinamos si habrán paginas escondidas tanto a la derecha como a la izquierda

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill:
          {
            const extraPages = range(startPage - spillOffset, startPage - 1);
            pages = [LEFT_PAGE, ...extraPages, ...pages];
          }

          break;
        case !hasLeftSpill && hasRightSpill:
          {
            const extraPages = range(endPage + 1, endPage + spillOffset);
            pages = [...pages, ...extraPages, RIGHT_PAGE];
          }
          break;

        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
        }
      }

      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  }

  if (!totalRecords || totalPages === 1) return null;

  //   const { currentPage } = state;
  const pages = fetchPageNumbers(totalPages, currentPage, currentNeighbours);

  function gotoPage(page) {
    const currentPage = Math.max(0, Math.min(page, totalPages));
    if (currentPage === 1) {
      querys ? querys.set("offset", 0) : querys.append("offset", 0);
      history.push({ search: querys.toString() });
    } else {
      const offset = (currentPage - 1) * pageLimit;
      querys ? querys.set("offset", offset) : querys.append("offset", offset);
      history.push({ search: querys.toString() });
    }
  }

  function handleClick(page) {
    return (event) => {
      event.preventDefault();
      gotoPage(page);
    };
  }

  function handleMoveLeft(event) {
    event.preventDefault();
    history.push({ search: `?${prev ? prev.split("?").pop() : ""}` });
  }

  function handleMoveRight(event) {
    event.preventDefault();
    history.push({ search: `?${next ? next.split("?").pop() : ""}` });
  }

  return (
    <PaginationDiv>
      <nav>
        <ul>
          {pages.map((page, index) => {
            if (page === LEFT_PAGE) {
              return (
                <li key={index} className="page-item">
                  <button className="page-link" onClick={handleMoveLeft}>
                    {/* <span>&laquo;</span> */}
                    <span>Prev</span>
                  </button>
                </li>
              );
            }

            if (page === RIGHT_PAGE) {
              return (
                <li key={index} className="page-item">
                  <button className="page-link" onClick={handleMoveRight}>
                    {/* <span>&raquo;</span> */}
                    <span>Next</span>
                  </button>
                </li>
              );
            }

            return (
              <li key={index} className={"page-item"}>
                <button
                  className={`page-link ${
                    currentPage === page ? "active" : ""
                  }`}
                  onClick={handleClick(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </PaginationDiv>
  );
};

export default Pagination;
