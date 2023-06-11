import { useDispatch, useSelector } from "react-redux";
// import { setPage, setPages } from "../../redux/slices/booksSlice";
import { useState } from "react";

import "./Pagination.css";

const Pagination = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const dispatch = useDispatch();

  // const {
  //   data: books,
  //   status,
  //   queryFields,
  //   response,
  //   // page,
  //   // pages,
  // } = useSelector((state) => state.books);

  let middlePagination;

  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, idx) => (
      <button
        key={idx + 1}
        onClick={() => setPage(idx + 1)}
        disabled={page === idx + 1}
      >
        {idx + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;

    middlePagination = (
      <>
        {[...Array(5)].map((_, idx) => (
          <button
            key={startValue + idx + 1}
            disabled={page === startValue + idx + 1}
            onClick={() => setPage(startValue + idx + 1)}
          >
            {startValue + idx + 1}
          </button>
        ))}

        <button>...</button>
        <button onClick={() => setPage(pages)}>{pages}</button>
      </>
    );

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <>
            <button onClick={() => setPage(1)}>1</button>
            <button>...</button>
            <button onClick={() => setPage(startValue)}>{startValue}</button>
            {[...Array(5)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                onClick={() => setPage(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}

            <button>...</button>
            <button onClick={() => setPage(pages)}>{pages}</button>
          </>
        );
      } else {
        let amountLeft = pages - page + 5;
        middlePagination = (
          <>
            <button onClick={() => setPage(1)}>1</button>
            <button>...</button>
            <button onClick={() => setPage(startValue)}>{startValue}</button>
            {[...Array(amountLeft)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                style={
                  pages < startValue + idx + 1 ? { display: "none" } : null
                }
                onClick={() => setPage(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }

  if (pages > 1) {
    return (
      <div className="pagination">
        <button
          className="pagination__prev"
          onClick={() => {
            let value = page - 1;
            setPage(value);
          }}
          disabled={page === 1}
        >
          &#171;
        </button>
        {middlePagination}
        <button
          className="pagination__next"
          onClick={() => {
            let value = page + 1;
            setPage(value);
          }}
          disabled={page === pages}
        >
          &#187;
        </button>
      </div>
    );
  }
};

export default Pagination;
