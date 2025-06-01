import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/FitMeCalendar.css';
import CalendarIcon from '../assets/icons/calendar.svg';
import ResetIcon from '../assets/icons/reset.svg';

const DateFilter = ({ selectedDate, setSelectedDate }) => {
  const [open, setOpen] = useState(false);

  const today = new Date();
  const parsedSelected = selectedDate ? new Date(selectedDate) : today;

  const isToday = parsedSelected.toDateString() === today.toDateString();
  const formattedDate = parsedSelected.toLocaleDateString('en-US');
  const displayValue = `Date: ${formattedDate}${isToday ? '' : ''}`;

  const handleReset = () => {
    setSelectedDate(today.toLocaleDateString('en-US'));
    setOpen(false);
  };

  return (
    <div className="relative flex items-center gap-2">
      <span
        className="bg-[#374151] font-semibold text-gray-200 tracking-wide px-4 py-1 rounded-md w-50 cursor-default select-none"
        style={{ textTransform: 'none' }}
      >
        {displayValue}
      </span>

      <img
        src={CalendarIcon}
        alt="Open calendar"
        title="Select Date"
        className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
        onClick={() => setOpen(!open)}
      />

      {!isToday && (
        <button
          onClick={handleReset}
          className="text-orange-500 text-lg hover:scale-110"
        >
          <img
            src={ResetIcon}
            alt="Clear filter"
            title="Reset to today"
            onClick={handleReset}
            className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
          />
        </button>
      )}

      {open && (
        <div className="absolute top-full mt-2 z-50">
          <DatePicker
            selected={parsedSelected}
            onChange={(date) => {
              if (date) {
                setSelectedDate(date.toLocaleDateString('en-US'));
              }
              setOpen(false);
            }}
            inline
            todayButton="Today"
            calendarClassName={`custom-datepicker ${isToday ? 'active-today' : ''}`}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <div className="flex justify-between items-center px-2 py-1">
                <button onClick={decreaseMonth}>&lt;</button>
                <span
                  className="text-sm font-bold"
                  style={{ fontVariantLigatures: 'none', fontFamily: 'sans-serif', fontWeight: 'bold' }}
                >
                  {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)} {date.getFullYear()}
                </span>
                <button onClick={increaseMonth}>&gt;</button>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default DateFilter;
