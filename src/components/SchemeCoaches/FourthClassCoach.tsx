import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setOpenModal } from "../../slices/modalSlice";
import { addSeat, removeSeat } from "../../slices/seatsSlice";
import { TSelectedSeat } from "../../models";
import fourthClassCoachImg from "./img/fourth-class.png";
import "./SchemeCoaches.css";

type FourthClassCoachProps = {
  direction: "from" | "to";
  coachId: string;
  coachNumber: string;
  availableSeats: {
    index: number,
    available: boolean
  }[];
  topSeatPrice: number;
  bottomSeatPrice: number;
  sideSeatPrice: number;
}

const FourthClassCoach = ({ direction, coachId, coachNumber, availableSeats, topSeatPrice, bottomSeatPrice, sideSeatPrice }: FourthClassCoachProps) => {
  const { activeTypeSeat, selectedSeats, limitPassenger } = useAppSelector(state => state.seats)
  const dispatch = useAppDispatch();

  const countSeats = 62;
  let seatMainOffsetX = 146;
  let seatSideOffsetX = 146;

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
    if (sideSeatPrice && seatNumber >= 33) {
      return sideSeatPrice;
    }

    if (seatNumber % 2 === 0) {
      return topSeatPrice || 0;
    } else {
      return bottomSeatPrice || 0;
    }
  }

  const onSelectSeat = (seat: number) => {
    if (!activeTypeSeat.from || activeTypeSeat.to) {
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

  const getRightRowSeatCoords = (seatNumber: number): { seatMainOffsetX: number, seatMainOffsetY: number } => {
    const seatOffset = 44;
    const upperSeatsY = 33;
    const lowerSeatsY = 55;

    if (seatNumber > 2 && seatNumber % 2 !== 0) {
      seatMainOffsetX += seatOffset;
    }

    const seatMainOffsetY = seatNumber % 2 !== 0 ? lowerSeatsY : upperSeatsY;

    return { seatMainOffsetX, seatMainOffsetY };
  };

  const getLeftRowSeatCoords = (seatNumber: number): { seatSideOffsetX: number, seatSideOffsetY: number } => {
    const seatOffset = 44;
    const upperSeatsY = 93;
    const lowerSeatsY = 115;

    if (seatNumber > 32 && seatNumber % 2 === 0) {
      seatSideOffsetX += seatOffset;
    }

    const seatSideOffsetY = (seatNumber % 2 !== 0 || seatNumber === 33 || seatNumber === 62) ? lowerSeatsY : upperSeatsY;

    return { seatSideOffsetX, seatSideOffsetY };
  }

  return (
    <div className="wagon-scheme">
      <div className="wagon-scheme__container">
        <img src={fourthClassCoachImg} alt="Схема вагона плацкарт" className="wagon-scheme__wagon-image" />

        <svg className="wagon-scheme__svg-layer" viewBox="0 0 921 145" preserveAspectRatio="xMinYMin meet">
          <g className="wagon-scheme__wagon" transform="translate(39, 0)" width="34" height="24">
            <rect width="34" height="24" className="wagon-scheme__wagon-rect" data-wagon-number="12" />
            <foreignObject width="34" height="24">
              <div className="wagon-scheme__wagon-number">{coachNumber}</div>
            </foreignObject>
          </g>

          {seats.map(seat => {
            const { seatMainOffsetX, seatMainOffsetY } = getRightRowSeatCoords(seat.index);
            const { seatSideOffsetX, seatSideOffsetY } = getLeftRowSeatCoords(seat.index);
            return (
              <React.Fragment key={seat.index}>
                {seat.index <= 32 &&
                  <g
                    className="wagon-scheme__seat"
                    transform={`translate(${seatMainOffsetX}, ${seatMainOffsetY})`}
                  >
                    <rect
                      width="25" height="17.5"
                      className={seat.available
                        ? "wagon-scheme__seat-rect wagon-scheme__seat-rect--available"
                        : "wagon-scheme__seat-rect"}
                    />
                    <foreignObject width="25" height="17.5">
                      <div
                        className={seat.available
                          ? selectedSeats[direction].some(s =>
                            s.coach_id === coachId && s.seat_number === seat.index)
                            ? "wagon-scheme__seat-number wagon-scheme__seat-number--available wagon-scheme__seat-number--active"
                            : "wagon-scheme__seat-number wagon-scheme__seat-number--available"
                          : "wagon-scheme__seat-number"
                        }
                        onClick={() => onSelectSeat(seat.index)}
                      >
                        {seat.index}
                      </div>
                    </foreignObject>
                  </g>}

                {seat.index > 32 &&
                  <g
                    className="wagon-scheme__seat"
                    transform={`translate(${seatSideOffsetX}, ${seatSideOffsetY})`}
                  >
                    <rect
                      width="25" height="17.5"
                      className={seat.available
                        ? "wagon-scheme__seat-rect wagon-scheme__seat-rect--available"
                        : "wagon-scheme__seat-rect"}
                    />
                    <foreignObject width="25" height="17.5">
                      <div
                        className={seat.available
                          ? selectedSeats[direction].some(s =>
                            s.coach_id === coachId && s.seat_number === seat.index)
                            ? "wagon-scheme__seat-number wagon-scheme__seat-number--available wagon-scheme__seat-number--active"
                            : "wagon-scheme__seat-number wagon-scheme__seat-number--available"
                          : "wagon-scheme__seat-number"
                        }
                        onClick={() => onSelectSeat(seat.index)}
                      >
                        {seat.index}
                      </div>
                    </foreignObject>
                  </g>}
              </React.Fragment>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default FourthClassCoach;