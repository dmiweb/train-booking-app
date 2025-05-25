import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { requestTrains, setPage } from "../../slices/trainSlice";
import { setOffset } from "../../slices/queryParamsSlice";
import { setFirstClass, setSecondClass, setThirdClass, setFourthClass, setWifi, setExpress } from "../../slices/queryParamsSlice";

interface TFilterOption {
  title: string;
  class: string;
  name: string;
  action: (value: boolean) => void;
}

const FilterOptions = () => {
  const { have_first_class, have_second_class, have_third_class, have_fourth_class, have_wifi, have_express } = useAppSelector(state => state.queryParams)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const options = [
    {
      title: "Люкс",
      class: "filter-options__first-class",
      name: "first-class",
      action: (value: boolean) => dispatch(setFirstClass(value)),
      isChecked: have_first_class,
    },
    {
      title: "Купе",
      class: "filter-options__second-class",
      name: "second-class",
      action: (value: boolean) => dispatch(setSecondClass(value)),
      isChecked: have_second_class,
    },
    {
      title: "Плацкарт",
      class: "filter-options__third-class",
      name: "third-class",
      action: (value: boolean) => dispatch(setThirdClass(value)),
      isChecked: have_third_class,
    },
    {
      title: "Сидячий",
      class: "filter-options__fourth-class",
      name: "fourth-class",
      action: (value: boolean) => dispatch(setFourthClass(value)),
      isChecked: have_fourth_class,
    },
    {
      title: "Wi-Fi",
      class: "filter-options__wi-fi",
      name: "wi-fi",
      action: (value: boolean) => dispatch(setWifi(value)),
      isChecked: have_wifi,
    },
    {
      title: "Экспресс",
      class: "filter-options__express",
      name: "express",
      action: (value: boolean) => dispatch(setExpress(value)),
      isChecked: have_express,
    },
  ];

  const handleCheckboxChange = (option: TFilterOption, isChecked: boolean) => {
    option.action(isChecked);
    dispatch(requestTrains());
    dispatch(setOffset(0));
    dispatch(setPage(1));

    navigate("/trains", {replace: true});
  };

  return (
    <div className="filter-options">
      {options.map((option, index) => {
        return (
          <div key={index} className="filter-options__option">
            <div className={`filter-options__title ${option.class}`}>
              {option.title}
            </div>

            <label className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch__checkbox"
                name={option.name}
                checked={option.isChecked}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              />
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