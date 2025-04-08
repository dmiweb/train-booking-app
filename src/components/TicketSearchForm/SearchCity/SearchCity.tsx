import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { requestCities } from "../../../slices/citiesSlice";
import "./SearchCity.css";

type SearchCityProps = {
  value: string;
  isVisible: boolean;
  onSelect: (city: string) => void;
}

const SearchCity = ({ value, isVisible, onSelect }: SearchCityProps) => {
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector(store => store.cities);

  useEffect(() => {
    if (!isVisible) dispatch(requestCities(""));
    dispatch(requestCities(value));
  }, [value, isVisible, dispatch]);

  return (
    isVisible && cities.length
      ? <ul className="search-city-list">
        {cities.map(city =>
          <li key={city._id} className="search-city-list__item">
            <span className="search-city-list__item-text" onClick={() => onSelect(city.name)}>
              {city.name}
            </span>
          </li>
        )}
      </ul>
      : null
  );
}

export default SearchCity;