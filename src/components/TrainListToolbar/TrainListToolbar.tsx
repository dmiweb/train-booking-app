import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { requestTrains } from "../../slices/trainSlice";
import { setLimit, setSort } from "../../slices/queryParamsSlice";
import "./TrainListToolbar.css";

const TrainListToolbar = () => {
  const [isOpenSortBy, setIsOpenSortBy] = useState(false);
  const { trains } = useAppSelector(state => state.trains);
  const { limit, sort } = useAppSelector(state => state.queryParams);

  const dispatch = useAppDispatch();

  const limitValues = [5, 10, 20];

  const sortByItems = [
    { key: "date", value: "времени" },
    { key: "price_min", value: "стоимости" },
    { key: "duration", value: "длительности" }
  ]

  const sortItems = useMemo(() => {
    const currentItemIndex = sortByItems.findIndex(item => item.key === sort);

    if (currentItemIndex <= 0) return [...sortByItems];
    const newItems = [...sortByItems];
    const [currentItem] = newItems.splice(currentItemIndex, 1);
    return [currentItem, ...newItems];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  const onSelectSortValue = (key: string) => {
    dispatch(setSort(key));

    if (key !== sort) {
      dispatch(requestTrains());
    }

    setIsOpenSortBy(false);
  };

  const onSelectShowBy = (value: number) => {
    dispatch(setLimit(value));

    if (value !== limit) {
      dispatch(requestTrains());
    }
  }

  return (
    <div className="train-list-toolbar">
      <div className="found-trains">
        <span className="found-trains__title">найдено:</span>
        <span className="found-trains__count">{trains.total_count}</span>
      </div>

      <div className="sorting-by">
        <span className="sorting-by__title">сортировать по:</span>

        <div className="sorting-by__action">
          <div
            className="sorting-by__select-value"
            onClick={() => setIsOpenSortBy(!isOpenSortBy)}
          >
            {sortItems.find(s => s.key === sort)?.value}
          </div>

          {isOpenSortBy &&
            <ul className="sorting-by__select-menu">
              {sortItems.map((item) =>
                <li
                  key={item.key}
                  className="sorting-by__select-menu-item"
                  onClick={() => onSelectSortValue(item.key)}
                >
                  {item.value}
                </li>
              )}
            </ul>}
        </div>
      </div>

      <div className="show-by">
        <span className="show-by__title">показывать по:</span>
        {limitValues.map((value, index) =>
          <button
            key={index}
            className={value === limit
              ? "show-by__limit show-by__limit--active"
              : "show-by__limit"}
            onClick={() => onSelectShowBy(value)}
          >
            {value}
          </button>
        )}
      </div>
    </div>
  );
}

export default TrainListToolbar;