import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getNepaliDate } from '../utils/nepaliDate';

function EventsModal({ date, events, onClose, onAddEvent }) {
  const { t, i18n } = useTranslation();
  const [newEvent, setNewEvent] = useState({ title: '', description: '' });
  const nepaliDate = getNepaliDate(date);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEvent.title.trim()) {
      onAddEvent(newEvent);
      setNewEvent({ title: '', description: '' });
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(i18n.language === 'ne' ? 'ne-NP' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNepaliDate = (nepaliDate) => {
    if (i18n.language === 'ne') {
      return `${nepaliDate.day} ${nepaliDate.monthName} ${nepaliDate.year}`;
    }
    return `${nepaliDate.day} ${nepaliDate.monthNameEn} ${nepaliDate.year}`;
  };

  return (
    <div className="events-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {t('events.title')} - {formatDate(date)}
          </h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="nepali-date-display" style={{ 
          textAlign: 'center', 
          marginBottom: '1rem', 
          color: '#64748b',
          fontSize: '0.9rem'
        }}>
          {formatNepaliDate(nepaliDate)}
        </div>

        <div className="event-list">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-title">{event.title}</div>
                <div className="event-description">{event.description}</div>
              </div>
            ))
          ) : (
            <div className="empty-state">{t('events.noEvents')}</div>
          )}
        </div>

        <div className="add-event-form">
          <h4>{t('events.addEvent')}</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{t('events.eventTitle')}</label>
              <input
                type="text"
                className="form-input"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder={t('events.eventTitle')}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t('events.eventDescription')}</label>
              <textarea
                className="form-input"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder={t('events.eventDescription')}
                rows="3"
              />
            </div>
            <button type="submit" className="add-btn">
              {t('events.add')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventsModal;