import "./TrainListToolbar.css";

const TrainListToolbar = () => {
  return (
    <div className="train-list-toolbar">
      <div className="found-trains">
        <span className="found-trains__title">найдено:</span>
        <span className="found-trains__count">20</span>
      </div>

      <div className="sorting-by">
        <span className="sorting-by__title">сортировать по:</span>
        <select className="sorting-by__select-menu">
          <option className="sorting-by__select-menu-item" value="time" selected>времени</option>
          <option className="sorting-by__select-menu-item" value="price">стоимости</option>
          <option className="sorting-by__select-menu-item" value="duration">длительности</option>
        </select>
      </div>

      <div className="show-by">
        <span className="show-by__title">показывать по:</span>
        <span className="show-by__count">5</span>
        <span className="show-by__count">10</span>
        <span className="show-by__count">20</span>
      </div>
    </div>
  );
}

export default TrainListToolbar;