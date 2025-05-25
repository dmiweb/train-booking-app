import { ReactNode } from "react";
import "./List.css";

type Identifiable = {
  departure: {
    _id: string;
  }
}

type ListProps<T extends Identifiable> = {
  list: T[];
  classNameItem?: string;
  limit?: number;
  renderItem: (item: T) => ReactNode;
}

const List = <T extends Identifiable>({ list = [], classNameItem, limit, renderItem }: ListProps<T>) => {
  const itemsToRender = limit ? list.slice(0, limit) : list;

  return (
    <ul className="list">
      {itemsToRender.map((item) =>
        <li key={item.departure._id} id={item.departure._id} className={classNameItem}>
          {renderItem(item)}
        </li>
      )}
    </ul>
  );
}

export default List;