import { useEffect, forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { requestCities } from "../../../slices/citiesSlice";
import { TCities } from "../../../models";
import "./SearchCity.css";

type SearchCityProps = {
  value: string;
  isVisible: boolean;
  onSelect: (city: TCities) => void;
}

const SearchCity = forwardRef<HTMLUListElement, SearchCityProps>(
({ value, isVisible, onSelect }: SearchCityProps, ref) => {
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector(store => store.cities);

  useEffect(() => {
    if (value.trim() === "") dispatch(requestCities("а"));
    if(value.trim() !== "") dispatch(requestCities(value));
  }, [value, dispatch]);

  return (
    isVisible && cities.length
      ? <ul className="search-city-list" ref={ref}>
        {cities.map(city =>
          <li key={city._id} className="search-city-list__item">
            <span className="search-city-list__item-text" onClick={() => onSelect(city)}>
              {city.name}
            </span>
          </li>
        )}
      </ul>
      : null
  );
});

export default SearchCity;