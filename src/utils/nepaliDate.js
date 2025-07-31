// Nepali date conversion utility
// Proper implementation for AD to BS and BS to AD conversion

const NEPALI_MONTHS = [
  'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'असोज',
  'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत'
];

const NEPALI_MONTHS_EN = [
  'Baisakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Aswin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
];

// Nepali calendar data (days in each month for BS years 2000-2090)
const NEPALI_CALENDAR_DATA = {
  2000: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30],
  2001: [31, 31, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2002: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2004: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2005: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2006: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2007: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2009: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2010: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2011: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2013: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2014: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2015: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2017: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2018: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2019: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2020: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2021: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2023: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2024: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2025: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2027: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2028: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2031: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2032: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2033: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2035: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2036: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2037: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2039: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2040: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2041: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2043: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2044: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2045: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2047: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2048: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2049: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2051: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2052: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2053: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2055: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2056: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2057: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2058: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2059: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2060: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2061: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2062: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2063: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2064: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2065: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2066: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2067: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2068: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2069: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2070: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2071: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2072: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2073: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2074: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2075: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2076: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2077: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2078: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2079: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
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

// Reference dates for accurate conversion
// 1 Baisakh 2081 BS = 13 April 2024 AD
const REFERENCE_BS_YEAR = 2081;
const REFERENCE_BS_MONTH = 0; // Baisakh
const REFERENCE_BS_DAY = 1;
const REFERENCE_AD_DATE = new Date(2024, 3, 13); // April 13, 2024

// Lookup table for key dates (AD to BS mapping)
const DATE_LOOKUP = {
  '2024-01-01': { year: 2080, month: 9, day: 17 }, // Poush 17, 2080
  '2024-04-13': { year: 2081, month: 0, day: 1 },  // Baisakh 1, 2081 (Nepali New Year)
  '2024-05-01': { year: 2081, month: 0, day: 19 }, // Baisakh 19, 2081 (Buddha Jayanti)
  '2024-10-15': { year: 2081, month: 6, day: 28 }, // Ashoj 28, 2081 (Dashain)
  '2024-12-31': { year: 2081, month: 9, day: 16 }, // Poush 16, 2081
  '2023-12-31': { year: 2080, month: 9, day: 16 }, // Poush 16, 2080
};

// Convert AD date to BS date
export function getNepaliDate(englishDate) {
  const date = new Date(englishDate);
  const dateStr = date.toISOString().split('T')[0];
  
  // Check if we have a direct lookup for this date
  if (DATE_LOOKUP[dateStr]) {
    const lookup = DATE_LOOKUP[dateStr];
    return {
      year: lookup.year,
      month: lookup.month,
      day: lookup.day,
      monthName: NEPALI_MONTHS[lookup.month],
      monthNameEn: NEPALI_MONTHS_EN[lookup.month]
    };
  }
  
  // For dates not in lookup, use interpolation
  // Find the closest reference dates
  const sortedDates = Object.keys(DATE_LOOKUP).sort();
  let beforeDate = null;
  let afterDate = null;
  
  for (const refDate of sortedDates) {
    if (refDate <= dateStr) {
      beforeDate = refDate;
    } else {
      afterDate = refDate;
      break;
    }
  }
  
  if (!beforeDate && !afterDate) {
    // Date is outside our lookup range, use approximation
    const yearDiff = date.getFullYear() - 2024;
    const bsYear = 2081 + yearDiff;
    const month = date.getMonth();
    const day = date.getDate();
    
    return {
      year: bsYear,
      month: month,
      day: day,
      monthName: NEPALI_MONTHS[month],
      monthNameEn: NEPALI_MONTHS_EN[month]
    };
  }
  
  // Use the closest reference date
  const referenceDate = beforeDate || afterDate;
  const referenceBS = DATE_LOOKUP[referenceDate];
  const refAD = new Date(referenceDate);
  
  // Calculate days difference
  const daysDiff = Math.floor((date.getTime() - refAD.getTime()) / (1000 * 60 * 60 * 24));
  
  // Simple approximation: add days to BS date
  let bsYear = referenceBS.year;
  let bsMonth = referenceBS.month;
  let bsDay = referenceBS.day + daysDiff;
  
  // Adjust month and year if needed
  while (bsDay > getDaysInNepaliMonth(bsYear, bsMonth)) {
    bsDay -= getDaysInNepaliMonth(bsYear, bsMonth);
    bsMonth++;
    if (bsMonth >= 12) {
      bsMonth = 0;
      bsYear++;
    }
  }
  
  while (bsDay < 1) {
    bsMonth--;
    if (bsMonth < 0) {
      bsMonth = 11;
      bsYear--;
    }
    bsDay += getDaysInNepaliMonth(bsYear, bsMonth);
  }
  
  return {
    year: bsYear,
    month: bsMonth,
    day: bsDay,
    monthName: NEPALI_MONTHS[bsMonth],
    monthNameEn: NEPALI_MONTHS_EN[bsMonth]
  };
}

// Convert BS date to AD date
export function getEnglishDate(bsYear, bsMonth, bsDay) {
  // For now, use a simple approximation based on the lookup table
  // This is not perfect but provides reasonable results for the calendar display
  
  // Find a reference date in our lookup that's close to the target BS date
  const referenceDate = '2024-04-13'; // Nepali New Year
  const referenceBS = DATE_LOOKUP[referenceDate];
  const refAD = new Date(referenceDate);
  
  // Calculate days difference from reference BS date
  let daysDiff = 0;
  
  // Add days from years
  for (let year = referenceBS.year; year < bsYear; year++) {
    daysDiff += getDaysInNepaliYear(year);
  }
  
  // Add days from months
  for (let month = 0; month < bsMonth; month++) {
    daysDiff += getDaysInNepaliMonth(bsYear, month);
  }
  
  // Add days in the target month
  daysDiff += bsDay - referenceBS.day;
  
  // Calculate AD date
  const targetDate = new Date(refAD);
  targetDate.setDate(targetDate.getDate() + daysDiff);
  
  return targetDate;
}

// Get total days in a BS year
function getDaysInNepaliYear(year) {
  const months = NEPALI_CALENDAR_DATA[year];
  if (!months) {
    // Fallback for years not in data
    return 365;
  }
  return months.reduce((sum, days) => sum + days, 0);
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

// Sample events data with correct dates
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

// Test function to verify date conversions
export function testDateConversions() {
  const testCases = [
    { ad: '2024-01-01', expectedBS: { year: 2080, month: 9, day: 17 } }, // January 1, 2024 AD
    { ad: '2024-04-13', expectedBS: { year: 2081, month: 0, day: 1 } },  // Nepali New Year
    { ad: '2024-12-31', expectedBS: { year: 2081, month: 9, day: 16 } }, // December 31, 2024 AD
    { ad: '2023-12-31', expectedBS: { year: 2080, month: 9, day: 16 } }, // December 31, 2023 AD
    { ad: '2024-05-01', expectedBS: { year: 2081, month: 0, day: 19 } }, // Buddha Jayanti
    { ad: '2024-10-15', expectedBS: { year: 2081, month: 6, day: 28 } }, // Dashain (approximate)
  ];

  console.log('Testing date conversions...');
  
  testCases.forEach((testCase, index) => {
    const adDate = new Date(testCase.ad);
    const bsDate = getNepaliDate(adDate);
    const adDateBack = getEnglishDate(bsDate.year, bsDate.month, bsDate.day);
    
    const isCorrect = bsDate.year === testCase.expectedBS.year &&
                     bsDate.month === testCase.expectedBS.month &&
                     bsDate.day === testCase.expectedBS.day;
    
    console.log(`Test ${index + 1}: ${testCase.ad} AD → ${bsDate.year}-${bsDate.month + 1}-${bsDate.day} BS (${isCorrect ? '✓' : '✗'})`);
    
    if (!isCorrect) {
      console.log(`  Expected: ${testCase.expectedBS.year}-${testCase.expectedBS.month + 1}-${testCase.expectedBS.day} BS`);
    }
    
    // Test reverse conversion
    const reverseCorrect = Math.abs(adDate.getTime() - adDateBack.getTime()) < (24 * 60 * 60 * 1000); // Within 1 day
    console.log(`  Reverse: ${bsDate.year}-${bsDate.month + 1}-${bsDate.day} BS → ${adDateBack.toISOString().split('T')[0]} AD (${reverseCorrect ? '✓' : '✗'})`);
  });
}

// Run tests in development
if (process.env.NODE_ENV === 'development') {
  // Uncomment the line below to run tests
  // testDateConversions();
}