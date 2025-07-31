import React from 'react';
import { useTranslation } from 'react-i18next';
import { getNepaliDate } from '../utils/nepaliDate';

function CalendarDay({ day, events, onClick }) {
  const { t, i18n } = useTranslation();
  const nepaliDate = getNepaliDate(day.date);
  
  const hasEvents = events.length > 0;
  
  const dayClasses = [
    'calendar-day',
    !day.isCurrentMonth && 'other-month',
    day.isToday && 'today',
    hasEvents && 'has-events'
  ].filter(Boolean).join(' ');

  const formatDate = (date) => {
    return date.toLocaleDateString(i18n.language === 'ne' ? 'ne-NP' : 'en-US', {
      day: 'numeric'
    });
  };

  const formatNepaliDate = (nepaliDate) => {
    if (i18n.language === 'ne') {
      return `${nepaliDate.day}`;
    }
    return `${nepaliDate.day}`;
  };

  return (
    <div className={dayClasses} onClick={onClick}>
      <div className="day-number">
        {formatDate(day.date)}
      </div>
      <div className="nepali-date">
        {formatNepaliDate(nepaliDate)}
      </div>
      {hasEvents && <div className="event-indicator"></div>}
    </div>
  );
}

export default CalendarDay;