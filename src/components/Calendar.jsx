import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCalendarDays, getNepaliMonthName, getNepaliDate } from '../utils/nepaliDate';
import CalendarDay from './CalendarDay';
import EventsModal from './EventsModal';

function Calendar({ currentDate, setCurrentDate, events, addEvent }) {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const days = getCalendarDays(currentYear, currentMonth);

  const weekdays = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
  ];

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + 1);
    setCurrentDate(newDate);
  };

  const handleDayClick = (day) => {
    setSelectedDate(day.date);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate(null);
  };

  const getCurrentMonthDisplay = () => {
    if (i18n.language === 'ne') {
      const nepaliDate = getNepaliDate(currentDate);
      const nepaliMonth = getNepaliMonthName(nepaliDate.month, 'ne');
      return `${nepaliMonth} ${nepaliDate.year}`;
    }
    return `${t(`months.${months[currentMonth]}`)} ${currentYear}`;
  };

  const getEventsForDate = (date) => {
    const dateKey = date.toISOString().split('T')[0];
    return events[dateKey] || [];
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-btn" onClick={handlePrevMonth}>
          ‹
        </button>
        <h2 className="current-month">{getCurrentMonthDisplay()}</h2>
        <button className="nav-btn" onClick={handleNextMonth}>
          ›
        </button>
      </div>

      <div className="calendar-grid">
        {weekdays.map(day => (
          <div key={day} className="weekday-header">
            {t(`weekdays.${day}`)}
          </div>
        ))}
        
        {days.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            events={getEventsForDate(day.date)}
            onClick={() => handleDayClick(day)}
          />
        ))}
      </div>

      {showModal && selectedDate && (
        <EventsModal
          date={selectedDate}
          events={getEventsForDate(selectedDate)}
          onClose={handleCloseModal}
          onAddEvent={(event) => {
            addEvent(selectedDate, event);
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
}

export default Calendar;