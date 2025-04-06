import plazcart from "./img/plazcart.png";
import "./SchemeWagons.css";

const PlazcartWagon = () => {
  const countSeats = 48;
  let seatMainOffsetX = 133;
  let seatSideOffsetX = 133;

  const seats = Array.from({ length: countSeats }, (_, i) => ({
    index: i + 1,
    available: false,
  }));

  const getMainSeatCoords = (seatNumber: number): { seatMainOffsetX: number, seatMainOffsetY: number } => {
    const seatOffset = 59.5;
    const blockOffset = 30;
    const upperSeatsY = 28.5;
    const lowerSeatsY = 59.5;

    if (seatNumber > 2 && seatNumber % 2 !== 0) {
      if ((seatNumber - 1) % 4 === 0 || (seatNumber - 1) % 4 === 1) {
        seatMainOffsetX += blockOffset;
      }

      if ((seatNumber - 1) % 4 === 2 || (seatNumber - 1) % 4 === 3) {
        seatMainOffsetX += seatOffset;
      }
    }

    const seatMainOffsetY = seatNumber % 2 !== 0 ? lowerSeatsY : upperSeatsY;

    return { seatMainOffsetX, seatMainOffsetY };
  };

  const getSideSeatCoords = (seatNumber: number): { seatSideOffsetX: number, seatSideOffsetY: number } => {
    const seatOffset = 46.5;
    const blockOffset = 43;
    const seatSideOffsetY = 113.4;

    if (seatNumber > 33) {
      if (seatNumber % 2 === 0) {
        seatSideOffsetX += blockOffset;
      } else {
        seatSideOffsetX += seatOffset;
      }
    }

    return { seatSideOffsetX, seatSideOffsetY };
  }

  return (
    <div className="wagon-scheme">
      <div className="wagon-scheme__container">
        <img src={plazcart} alt="Схема вагона плацкарт" className="wagon-scheme__wagon-image" />

        <svg className="wagon-scheme__svg-layer" viewBox="0 0 921 145" preserveAspectRatio="xMinYMin meet">
          <g className="wagon-scheme__wagon" transform="translate(39, 0)" width="34" height="24">
            <rect width="34" height="24" className="wagon-scheme__wagon-rect" data-wagon-number="12" />
            <foreignObject width="34" height="24">
              <div className="wagon-scheme__wagon-number">12</div>
            </foreignObject>
          </g>

          {seats.map(seat => {
            const { seatMainOffsetX, seatMainOffsetY } = getMainSeatCoords(seat.index);
            const { seatSideOffsetX, seatSideOffsetY } = getSideSeatCoords(seat.index);
            return (
              <>
                {seat.index <= 32 &&
                  <g
                    key={seat.index}
                    className="wagon-scheme__seat"
                    transform={`translate(${seatMainOffsetX}, ${seatMainOffsetY})`}
                  >
                    <rect
                      width="26.5" height="31.5"
                      className={seat.available
                        ? "wagon-scheme__seat-rect wagon-scheme__seat-rect--available"
                        : "wagon-scheme__seat-rect"}
                    />
                    <foreignObject width="26.5" height="31">
                      <div className="wagon-scheme__seat-number">{seat.index}</div>
                    </foreignObject>
                  </g>}

                {seat.index > 32 &&
                  <g
                    key={seat.index}
                    className="wagon-scheme__seat"
                    transform={`translate(${seatSideOffsetX}, ${seatSideOffsetY})`}
                  >
                    <rect
                      width="43" height="23.4"
                      className={seat.available
                        ? "wagon-scheme__seat-rect wagon-scheme__seat-rect--available"
                        : "wagon-scheme__seat-rect"}
                    />
                    <foreignObject width="43" height="23.4">
                      <div
                        className={seat.available
                          ? "wagon-scheme__seat-number wagon-scheme__seat-number--available"
                          : "wagon-scheme__seat-number"}
                      >
                        {seat.index}
                      </div>
                    </foreignObject>
                  </g>}
              </>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default PlazcartWagon;