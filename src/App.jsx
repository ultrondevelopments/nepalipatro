import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Calendar from './components/Calendar';
import LanguageToggle from './components/LanguageToggle';
import './i18n/config';

function App() {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});

  useEffect(() => {
    // Load sample events
    const sampleEvents = {
      '2024-10-15': [
        { id: 1, title: t('sampleEvents.dashain.title'), description: t('sampleEvents.dashain.description') }
      ],
      '2024-11-05': [
        { id: 2, title: t('sampleEvents.tihar.title'), description: t('sampleEvents.tihar.description') }
      ],
      '2024-01-26': [
        { id: 3, title: t('sampleEvents.republic.title'), description: t('sampleEvents.republic.description') }
      ],
      '2024-05-29': [
        { id: 4, title: t('sampleEvents.independence.title'), description: t('sampleEvents.independence.description') }
      ]
    };
    setEvents(sampleEvents);
  }, [t]);

  const addEvent = (date, event) => {
    const dateKey = date.toISOString().split('T')[0];
    const newEvents = { ...events };
    
    if (!newEvents[dateKey]) {
      newEvents[dateKey] = [];
    }
    
    newEvents[dateKey].push({
      id: Date.now(),
      ...event
    });
    
    setEvents(newEvents);
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">{t('title')}</h1>
        <p className="subtitle">{t('subtitle')}</p>
        <LanguageToggle />
      </div>
      
      <Calendar 
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        events={events}
        addEvent={addEvent}
      />
    </div>
  );
}

export default App;