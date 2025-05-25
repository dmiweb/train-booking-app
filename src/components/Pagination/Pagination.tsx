import "./Pagination.css";

type PaginationProps = {
  count: number;
  page: number;
  limit: number;
  indent?: number;
  onChangePage: (pageNumber: number) => void;
}

const Pagination = ({ count, page, limit, indent = 1, onChangePage }: PaginationProps) => {
  const length = Math.ceil(count / Math.max(limit, 1));

  let left = Math.max(page - indent, 1);
  const right = Math.min(left + indent * 2, length);

  left = Math.max(right - indent * 2, 1);

  const items = [];

  if (left > 1) items.push(1);
  if (left > 2) items.push(null);

  for (let page = left; page <= right; page++) items.push(page);

  if (right < length - 1) items.push(null);
  if (right < length) items.push(length);

  return (
    <>
      {items.length
        ? <ul className="pagination">
          <li
            className="pagination__page-button"
            onClick={() => page > 1 && onChangePage(page - 1)}
          >
            {"<"}
          </li>

          {items.map((number, index) => {
            return (
              <li key={index}
                className={number === page
                  ? "pagination__page-number pagination__page-number--active"
                  : "pagination__page-number"}
                onClick={() => number && onChangePage(number)}
              >
                {number || "..."}
              </li>
            );
          })}
          <li
            className="pagination__page-button"
            onClick={() => page < length && onChangePage(page + 1)}
          >
            {">"}
          </li>
        </ul>
        : null}
    </>
  );
}

export default Pagination;