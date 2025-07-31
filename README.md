# Nepali Events Calendar

A clean, modern web application for managing events in both Nepali and English languages. This calendar displays both Gregorian (English) and Bikram Sambat (Nepali) dates, making it perfect for users who need to work with both calendar systems.

## Features

- 🌍 **Bilingual Support**: Full support for both English and Nepali languages
- 📅 **Dual Calendar Display**: Shows both English and Nepali dates
- 🎯 **Event Management**: Add, view, and manage events for any date
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Clean UI**: Modern, minimalist design with smooth interactions
- 🏛️ **Nepali Festivals**: Pre-loaded with major Nepali festivals and holidays

## Sample Events Included

- **Dashain Festival** (October 15, 2024)
- **Tihar Festival** (November 5, 2024)
- **Republic Day** (January 26, 2024)
- **Independence Day** (May 29, 2024)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nepali-events-calendar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Language Toggle
- Click the "English" or "नेपाली" buttons in the header to switch languages
- All interface elements, including dates and events, will update accordingly

### Navigation
- Use the arrow buttons (‹ ›) to navigate between months
- The current month and year are displayed in the center

### Adding Events
1. Click on any date in the calendar
2. A modal will open showing existing events for that date
3. Fill in the event title and description
4. Click "Add" to save the event

### Viewing Events
- Days with events are highlighted with a yellow background
- A red dot indicator appears on days with events
- Click on any day to view its events

## Technology Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Internationalization**: react-i18next
- **Styling**: Custom CSS with modern design principles
- **Date Handling**: Custom Nepali date conversion utilities

## Project Structure

```
src/
├── components/
│   ├── Calendar.jsx          # Main calendar component
│   ├── CalendarDay.jsx       # Individual day component
│   ├── EventsModal.jsx       # Event management modal
│   └── LanguageToggle.jsx    # Language switcher
├── i18n/
│   ├── config.js             # i18n configuration
│   ├── en.json              # English translations
│   └── ne.json              # Nepali translations
├── utils/
│   └── nepaliDate.js        # Nepali date conversion utilities
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
└── index.css               # Global styles
```

## Nepali Date System

The application includes a simplified Nepali date conversion system that:
- Converts Gregorian dates to Bikram Sambat (BS) dates
- Displays Nepali month names in both scripts
- Handles the approximate 57-year difference between AD and BS calendars

**Note**: For production use, consider implementing a more accurate Nepali date conversion algorithm or using established libraries.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions, issues, or contributions, please open an issue on the GitHub repository.

---

**Made with ❤️ for the Nepali community** 
