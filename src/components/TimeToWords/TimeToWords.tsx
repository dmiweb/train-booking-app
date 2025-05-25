import { calcDurationTime } from "../../utils/calcDurationTime";

type TimeToWordsProps = {
  departureTimestamp?: number;
  arrivalTimestamp?: number;
}

const TimeToWords = ({ departureTimestamp, arrivalTimestamp }: TimeToWordsProps) => {

  if (!departureTimestamp || !arrivalTimestamp) {
    return null;
  }

  const time = calcDurationTime(departureTimestamp, arrivalTimestamp)

  const [hours, minutes] = time.split(':').map(Number);

  const getHourWord = (hours: number) => {
    if (hours % 100 >= 11 && hours % 100 <= 14) {
      return 'часов';
    }
    switch (hours % 10) {
      case 1: return 'час';
      case 2:
      case 3:
      case 4: return 'часа';
      default: return 'часов';
    }
  }

  const getMinuteWord = (minutes: number) => {
    if (minutes % 100 >= 11 && minutes % 100 <= 14) {
      return 'минут';
    }
    switch (minutes % 10) {
      case 1: return 'минута';
      case 2:
      case 3:
      case 4: return 'минуты';
      default: return 'минут';
    }
  }

  return (
    <>
      <span>{`${hours} ${getHourWord(hours)}`}</span>
      <span>{`${minutes} ${getMinuteWord(minutes)}`}</span>
    </>
  );
}

export default TimeToWords;