import { useAppDispatch, useAppSelector } from "../../hooks";
import { setActiveTypeCoach } from "../../slices/seatsSlice";
import { SeatingPlacesIconSvg, PlazcartIconSvg, CoupeIconSvg, LuxIconSvg } from "../../components/icons";

const SelectTypeCoach = ({ direction }: { direction: "from" | "to" }) => {
  const { activeTypeCoach } = useAppSelector(state => state.seats);
  const dispatch = useAppDispatch();

  const onSelectTypeCoach = (typeValue: string) => {
    dispatch(setActiveTypeCoach({ type: direction, value: typeValue }));
  }

  return (
    <>
      <h2 className="select-seats__coach-title">Тип вагона</h2>

      <div className="select-seats__coach-types">
        <div
          className={activeTypeCoach[direction] === "fourth"
            ? "select-seats__fourth-class select-seats__fourth-class--selected"
            : "select-seats__fourth-class"}
          onClick={() => onSelectTypeCoach("fourth")}
        >
          <SeatingPlacesIconSvg width={30.5} fill="#c4c4c4" />
          <div className="select-seats__coach-type-name">Сидячий</div>
        </div>

        <div
          className={activeTypeCoach[direction] === "third"
            ? "select-seats__third-class select-seats__third-class--selected"
            : "select-seats__third-class"}
          onClick={() => onSelectTypeCoach("third")}
        >
          <PlazcartIconSvg width={50} fill="#c4c4c4" />
          <div className="select-seats__coach-type-name">Плацкарт</div>
        </div>

        <div
          className={activeTypeCoach[direction] === "second"
            ? "select-seats__second-class select-seats__second-class--selected"
            : "select-seats__second-class"}
          onClick={() => onSelectTypeCoach("second")}
        >
          <CoupeIconSvg width={50} fill="#c4c4c4" />
          <div className="select-seats__coach-type-name">Купе</div>
        </div>

        <div
          className={activeTypeCoach[direction] === "first"
            ? "select-seats__first-class select-seats__first-class--selected"
            : "select-seats__first-class"}
          onClick={() => onSelectTypeCoach("first")}
        >
          <LuxIconSvg width={56.5} fill="#c4c4c4" />
          <div className="select-seats__coach-type-name">Люкс</div>
        </div>
      </div>
    </>
  );
}

export default SelectTypeCoach;