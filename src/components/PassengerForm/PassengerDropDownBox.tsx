import { useAppDispatch, useAppSelector } from '../../hooks';
import { deletePassenger } from '../../slices/passengersSlice';
import { removeSeat } from '../../slices/seatsSlice';
import { TSelectedSeat } from '../../models';
import { PlusIconSvg, MinusIconSvg } from '../icons';

type PassengerDropDownBoxProps = {
  isOpenForm: boolean;
  passengerNumber: number;
  seat: TSelectedSeat;
  toggleVisibilityForm: (formNumber: number) => void;
}

const PassengerDropDownBox = ({
  isOpenForm,
  passengerNumber,
  seat,
  toggleVisibilityForm
}: PassengerDropDownBoxProps) => {
  const { seats } = useAppSelector(state => state.passengers.departure);
  const dispatch = useAppDispatch();

  return (
    <div className='passenger__drop-down-box'>
      <button className={isOpenForm
        ? "passenger__toggle-visible-btn--open"
        : "passenger__toggle-visible-btn--close"}
        onClick={() => toggleVisibilityForm(passengerNumber)}
      >
        {isOpenForm
          ? <MinusIconSvg width={18} fill='#928f94' />
          : <PlusIconSvg width={18} fill='#ffa800' />}
      </button>
      <h2 className="passenger__title">Пассажир {passengerNumber + 1}</h2>
      <button
        className="passenger__remove"
        onClick={() => {
          dispatch(removeSeat({
            type: "from",
            value: seat
          }))
          dispatch(deletePassenger({
            type: "departure",
            seat_number: seat.seat_number,
            coach_id: seat.coach_id
          }))

          if (isOpenForm) {
            toggleVisibilityForm(seats.length - 1)
          }
        }}
      >
        <PlusIconSvg width={18} fill='#928f94' />
      </button>
    </div>
  );
}

export default PassengerDropDownBox;