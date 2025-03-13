const FilterOptions = () => {
  const options = [
    { title: "Купе", class: "filter-options__coupe", name: "coupe" },
    { title: "Плацкарт", class: "filter-options__reserved-seat", name: "reserved-seat" },
    { title: "Сидячий", class: "filter-options__seating-places", name: "seating-places" },
    { title: "Люкс", class: "filter-options__lux", name: "lux" },
    { title: "Wi-Fi", class: "filter-options__wi-fi", name: "wi-fi" },
    { title: "Экспресс", class: "filter-options__express", name: "express" },
  ]

  return (
    <div className="filter-options">
      {options.map(option => {
        return(
          <div className="filter-options__option">
          <div className={`filter-options__title filter-options__${option.name}-title`}>{option.title}</div>

          <label className="toggle-switch">
            <input type="checkbox" className="toggle-switch__checkbox" name={option.name} />
            <span className="toggle-switch__slider">
              <span className="toggle-switch__thumb"></span>
            </span>
          </label>
        </div>
        );
      })}
    </div>
  );
}

export default FilterOptions;