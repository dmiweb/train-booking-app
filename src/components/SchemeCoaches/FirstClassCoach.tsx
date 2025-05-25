import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setOpenModal } from "../../slices/modalSlice";
import { addSeat, removeSeat } from "../../slices/seatsSlice";
import { TSelectedSeat } from "../../models";
import FirsClassCoachImg from "./img/first-class.png";
import "./SchemeCoaches.css";

type FirstClassCoachProps = {
  direction: "from" | "to";
  coachId: string;
  coachNumber: string;
  availableSeats: {
    index: number,
    available: boolean
  }[];
  seatPrice: number;
}

const FirstClassCoach = ({ direction, coachId, coachNumber, availableSeats, seatPrice }: FirstClassCoachProps) => {

  const { activeTypeSeat, selectedSeats, limitPassenger } = useAppSelector(state => state.seats)
  const dispatch = useAppDispatch();

  const countSeats = 16;
  let seatMainOffsetX = 133;

  const seats = Array.from({ length: countSeats }, (_, i) => ({
    index: i + 1,
    available: false,
  }));

  availableSeats.forEach((seat) => {
    const seatIndex = seats.findIndex((s) => s.index === seat.index);
    if (seatIndex !== -1) {
      seats[seatIndex].available = true;
    }
  });

  const getSeatPrice = (seatNumber: number): number => {
    if (seatNumber) {
      return seatPrice;
    }

    return 0;
  }

  const onSelectSeat = (seat: number) => {
    if (!activeTypeSeat[direction]) {
      dispatch(setOpenModal());
      return;
    }

    const isAvailable = seats.some(s => s.index === seat && s.available);
    const isSelected = selectedSeats[direction].some(s =>
      s.coach_id === coachId && s.seat_number === seat);

    if (!isAvailable) return;

    const selectedSeat: TSelectedSeat = {
      coach_id: coachId,
      seat_number: seat,
      is_adult: activeTypeSeat[direction] === "adult"
        || activeTypeSeat[direction] === "childNoSeat",
      is_child: activeTypeSeat[direction] === "child"
        || activeTypeSeat[direction] === "childNoSeat",
      include_children_seat: activeTypeSeat[direction] === "child",
      price: getSeatPrice(seat),
    };

    if (activeTypeSeat[direction] && isAvailable && !isSelected && selectedSeats[direction].length + 1 <= limitPassenger) {
      dispatch(addSeat({
        type: direction,
        value: selectedSeat,
      }));
    } else {
      dispatch(removeSeat({
        type: direction,
        value: selectedSeat,
      }));
    }
  }

  const getMainSeatCoords = (seatNumber: number): { seatMainOffsetX: number, seatMainOffsetY: number } => {
    const seatOffset = 59.5;
    const blockOffset = 30.2;
    const seatsY = 28.5;

    if (seatNumber > 1) {
      if (seatNumber % 2 === 0) {
        seatMainOffsetX += seatOffset;
      } else {
        seatMainOffsetX += blockOffset;
      }
    }

    const seatMainOffsetY = seatsY;

    return { seatMainOffsetX, seatMainOffsetY };
  };

  return (
    <div className="wagon-scheme">
      <div className="wagon-scheme__container">
        <img src={FirsClassCoachImg} alt="Схема вагона плацкарт" className="wagon-scheme__wagon-image" />

        <svg className="wagon-scheme__svg-layer" viewBox="0 0 921 145" preserveAspectRatio="xMinYMin meet">
          <g className="wagon-scheme__wagon" transform="translate(39, 0)" width="34" height="24">
            <rect width="34" height="24" className="wagon-scheme__wagon-rect" data-wagon-number="12" />
            <foreignObject width="34" height="24">
              <div className="wagon-scheme__wagon-number">{coachNumber}</div>
            </foreignObject>
          </g>

          {seats.map(seat => {
            const { seatMainOffsetX, seatMainOffsetY } = getMainSeatCoords(seat.index);

            return (
              <React.Fragment key={seat.index}>
                <g
                  className="wagon-scheme__seat"
                  transform={`translate(${seatMainOffsetX}, ${seatMainOffsetY})`}
                >
                  <rect
                    width="26" height="58.5"
                    className={seat.available
                      ? "wagon-scheme__seat-rect wagon-scheme__seat-rect--available"
                      : "wagon-scheme__seat-rect"}
                  />
                  <foreignObject width="26.5" height="58.5">
                    <div
                      className={seat.available
                        ? selectedSeats[direction].some(s =>
                          s.coach_id === coachId && s.seat_number === seat.index)
                          ? "wagon-scheme__seat-first-class-number wagon-scheme__seat-number--available wagon-scheme__seat-number--first-class-active"
                          : "wagon-scheme__seat-first-class-number wagon-scheme__seat-number--available"
                        : "wagon-scheme__seat-first-class-number"
                      }
                      onClick={() => onSelectSeat(seat.index)}
                    >
                      {seat.index}
                    </div>
                  </foreignObject>
                </g>
              </React.Fragment>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default FirstClassCoach;