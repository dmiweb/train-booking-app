import { useState, forwardRef } from 'react';
import './Calendar.css';

type CalendarProps = {
  className?: string;
  selectedDate: string;
  handler: (day: string) => void;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, selectedDate, handler }: CalendarProps, ref) => {
    const [currentDate, setCurrentDate] = useState(selectedDate ? new Date(selectedDate) : new Date());

    // Обработчик выбора даты
    const handleDateSelect = (day: number) => {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

      const formattedDate = newDate.toLocaleDateString('en-CA', { // YYYY-MM-DD
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      handler(formattedDate);
    };

    // Переключение месяцев
    const changeMonth = (increment: number) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + increment);
      setCurrentDate(newDate);
    };

    // Генерация дней месяца
    const renderDays = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const today = new Date();

      // Нормализуем firstDayOfMonth (0 - воскресенье → смещаем так, чтобы 1 - понедельник был первым)
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInPrevMonth = new Date(year, month, 0).getDate();

      const days = [];

      // Добавляем дни предыдущего месяца (с правильным смещением)
      for (let i = 0; i < adjustedFirstDay; i++) {
        const day = daysInPrevMonth - adjustedFirstDay + i + 1;
        days.push(<div key={`prev-${day}`} className="calendar-day other-month">{day}</div>);
      }

      // Добавляем дни текущего месяца
      for (let i = 1; i <= daysInMonth; i++) {
        const dayDate = new Date(year, month, i);
        const isPast = dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isSelected = selectedDate && new Date(selectedDate).toDateString() === dayDate.toDateString();

        days.push(
          <div
            key={i}
            className={`calendar-day ${isSelected ? 'selected' : ''} ${isPast ? 'past-day' : ''}`}
            onClick={!isPast ? () => handleDateSelect(i) : undefined}
          >
            {i}
            {dayDate.toDateString() === today.toDateString() && <div className="today-marker" />}
          </div>
        );
      }

      // Добавляем дни следующего месяца (оставшиеся ячейки)
      const totalCells = Math.ceil((daysInMonth + adjustedFirstDay) / 7) * 7;
      const remainingDays = totalCells - (daysInMonth + adjustedFirstDay);

      for (let i = 1; i <= remainingDays; i++) {
        days.push(<div key={`next-${i}`} className="calendar-day other-month">{i}</div>);
      }

      return days;
    };

    return (
      <div ref={ref} className={className ? `calendar-popup ${className}` : "calendar-popup"}>
        <div className="calendar-header">
          <button
            type='button'
            className="calendar-nav-button"
            onClick={() => changeMonth(-1)}
            disabled={
              currentDate.getMonth() <= new Date().getMonth() &&
              currentDate.getFullYear() <= new Date().getFullYear()
            }
          >
            &lt;
          </button>
          <div className="calendar-month-year">
            {currentDate.toLocaleString('default', { month: 'long' })}
            {/* {currentDate.getFullYear()} */}
          </div>
          <button
            type='button'
            className="calendar-nav-button"
            onClick={() => changeMonth(1)}
          >
            &gt;
          </button>
        </div>

        <div className="calendar-days-grid">{renderDays()}</div>
      </div>
    );
  });

export default Calendar;