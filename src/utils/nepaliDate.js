// Nepali date conversion utility
// This is a simplified version - in production you'd want to use a proper library

const NEPALI_MONTHS = [
  'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'असोज',
  'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत'
];

const NEPALI_MONTHS_EN = [
  'Baisakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Aswin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
];

// Nepali calendar data (days in each month for BS years 2080-2090)
const NEPALI_CALENDAR_DATA = {
  2080: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30],
  2081: [31, 31, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2082: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2083: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2084: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2085: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2086: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2087: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2088: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2089: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2090: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]
};

// Approximate mapping for current year (2024) to BS 2081
const CURRENT_BS_YEAR = 2081;

export function getNepaliDate(englishDate) {
  const date = new Date(englishDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  // This is a simplified conversion - for accurate conversion you'd need a proper algorithm
  // For now, we'll use an approximation based on the difference between AD and BS
  const bsYear = year + 57; // Approximate conversion
  
  // Get the Nepali month and day (simplified)
  const nepaliMonth = month;
  const nepaliDay = day;
  
  return {
    year: bsYear,
    month: nepaliMonth,
    day: nepaliDay,
    monthName: NEPALI_MONTHS[nepaliMonth],
    monthNameEn: NEPALI_MONTHS_EN[nepaliMonth]
  };
}

export function getDaysInNepaliMonth(year, month) {
  return NEPALI_CALENDAR_DATA[year]?.[month] || 30;
}

export function getNepaliMonthName(month, language = 'en') {
  if (language === 'ne') {
    return NEPALI_MONTHS[month] || '';
  }
  return NEPALI_MONTHS_EN[month] || '';
}

export function formatNepaliDate(date, language = 'en') {
  const nepaliDate = getNepaliDate(date);
  const monthName = getNepaliMonthName(nepaliDate.month, language);
  
  if (language === 'ne') {
    return `${nepaliDate.day} ${monthName} ${nepaliDate.year}`;
  }
  return `${nepaliDate.day} ${monthName} ${nepaliDate.year}`;
}

// Get calendar days for a given month
export function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const currentDate = new Date(startDate);
  
  // Generate 42 days (6 weeks * 7 days) to ensure we have enough for any month
  for (let i = 0; i < 42; i++) {
    days.push({
      date: new Date(currentDate),
      isCurrentMonth: currentDate.getMonth() === month,
      isToday: isSameDay(currentDate, new Date()),
      nepaliDate: getNepaliDate(currentDate)
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
}

function isSameDay(date1, date2) {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
}

// Sample events data
export const SAMPLE_EVENTS = {
  '2024-10-15': [
    { id: 1, title: 'Dashain Festival', description: 'The biggest festival of Nepal' }
  ],
  '2024-11-05': [
    { id: 2, title: 'Tihar Festival', description: 'Festival of lights' }
  ],
  '2024-01-26': [
    { id: 3, title: 'Republic Day', description: 'Commemorating the establishment of the Federal Democratic Republic of Nepal' }
  ],
  '2024-05-29': [
    { id: 4, title: 'Independence Day', description: 'Celebrating Nepal\'s independence' }
  ]
};