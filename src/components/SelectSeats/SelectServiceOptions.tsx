import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setOptionsService } from "../../slices/seatsSlice";
import { TSeat, TSelectedOptions } from "../../models";
import { ConditionerIconSvg, WifiIconSvg, BedLinenIconSvg, FoodIconSvg } from "../../components/icons";

type ServiceOption = 'conditioner' | 'wifi' | 'linens' | 'food';

interface SelectOptionsProps {
  direction: "from" | "to";
  coach: TSeat["coach"];
}

const SelectServiceOptions = ({ direction, coach }: SelectOptionsProps) => {
  const { optionsService } = useAppSelector(state => state.seats)
  const dispatch = useAppDispatch();

  const currentOptions = optionsService[direction] as TSelectedOptions;

  const getInitialState = (): TSelectedOptions => ({
    conditioner: coach.have_air_conditioning && coach.class_type === "first"
      ? 'included'
      : 'unselected',
    wifi: coach.have_wifi && coach.class_type === 'first'
      ? 'included'
      : 'unselected',
    linens: coach.is_linens_included && coach.class_type !== 'fourth'
      ? 'included'
      : 'unselected',
    food: 'unselected'
  });

  useEffect(() => {
    dispatch(setOptionsService({ type: direction, value: getInitialState() }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обработчик изменения состояния
  const handleOptionClick = (option: ServiceOption): void => {
    if (currentOptions[option] === 'included') return;

    const newStatus = currentOptions[option] === 'selected' ? 'unselected' : 'selected';

    dispatch(setOptionsService({
      type: direction,
      value: {...currentOptions, [option]: newStatus}
    }));
  };

  // Определяем, нужно ли показывать опцию
  const shouldShowOption = (option: ServiceOption): boolean => {
    switch (option) {
      case 'conditioner':
        return coach.have_air_conditioning;
      case 'wifi':
        return coach.have_wifi;
      case 'linens':
        return coach.class_type !== 'fourth';
      case 'food':
        return true;
      default:
        return false;
    }
  };

  // Получаем классы для иконки
  const getOptionClasses = (option: ServiceOption): string => {
    const base = 'select-seats__coach-service-option';
    const status = (optionsService[direction] as TSelectedOptions)[option];

    return [
      base,
      status === 'included' && `${base}--included`,
      status === 'selected' && `${base}--selected`,
      status === 'included' && 'select-seats__coach-service-option--disabled'
    ].filter(Boolean).join(' ');
  };

  return (
    <div className="select-seats__coach-service">
      <span className="select-seats__coach-service-title">Обслуживание</span>
      <span className="select-seats__coach-service-company">{coach.name}</span>

      <div className="select-seats__coach-service-options">
        {shouldShowOption('conditioner') && (
          <span
            className={getOptionClasses('conditioner')}
            onClick={() => handleOptionClick('conditioner')}
          >
            <ConditionerIconSvg width={22} fill="#292929" />
          </span>
        )}

        {shouldShowOption('wifi') && (
          <span
            className={getOptionClasses('wifi')}
            onClick={() => handleOptionClick('wifi')}
          >
            <WifiIconSvg width={22} fill="#292929" />
          </span>
        )}

        {shouldShowOption('linens') && (
          <span
            className={getOptionClasses('linens')}
            onClick={() => handleOptionClick('linens')}
          >
            <BedLinenIconSvg width={23} fill="#292929" />
          </span>
        )}

        {shouldShowOption('food') && (
          <span
            className={getOptionClasses('food')}
            onClick={() => handleOptionClick('food')}
          >
            <FoodIconSvg width={20} fill="#292929" />
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectServiceOptions;