# Class Memory Platform

A simple web application for sharing class memories, student profiles, and event documentation.

## Features

- **Home Page**: Displays recent memories including student profiles and event media
- **Student Profiles**: Detailed profiles with contact information and social media links
- **Activities Page**: Events with associated media (photos, videos, blogs)
- **Timeline View**: Chronological view of events organized by year
- **Mobile-Friendly**: Responsive design that works on all devices

## Project Structure

```
class-memory/
├── index.html          # Main HTML file
├── styles.css          # CSS styles with responsive design
├── script.js           # JavaScript functionality
├── data.js             # Mock data (students, events, media)
└── README.md           # This file
```

## Mock Data Included

### Students (5 profiles)
- Emily Johnson - Environmental Science enthusiast
- Marcus Chen - Computer Science and game development
- Sophia Rodriguez - Theater arts and musical performances
- David Kim - Basketball team captain and community service
- Isabella Taylor - Journalism and school newspaper editor

### Events (3 events)
- Annual Sports Day (May 15, 2024)
- Graduation Ceremony (June 20, 2024)
- Science Field Trip (March 10, 2024)

### Media Items
- 2-3 media items per event (photos, videos, blog posts)
- Placeholder content with descriptions

## How to Run

1. Open `index.html` in any modern web browser
2. Navigate between sections using the top navigation
3. Click on cards to view detailed information in modal popups
4. View social media links and contact information in student profiles

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox/grid, animations, and responsive design
- **JavaScript (ES6+)**: Dynamic content loading and user interactions
- **No external dependencies**: Pure vanilla web technologies

## Features Highlights

- **Card-based Layout**: Clean, modern card design for all content
- **Modal Popups**: Detailed views without page navigation
- **Smooth Animations**: CSS transitions and hover effects
- **Timeline Design**: Visual timeline for chronological event browsing
- **Social Media Integration**: Links to Facebook, Instagram, and LinkedIn
- **Mobile Optimization**: Responsive design for mobile devices

## Customization

To add your own data:

1. Edit `data.js` to modify the `mockData` object
2. Add new students to the `students` array
3. Add new events to the `events` array
4. Each event can have multiple media items
5. The app will automatically generate the home page memories

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Backend integration for data persistence
- User authentication and profile management
- Photo/video upload functionality
- Search and filtering capabilities
- Real social media API integration
- Comment and reaction features
