# 🌊 ShoreSquad - Beach Cleanup Community

> Rally your crew, track weather, and hit the next beach cleanup with our dope map app!

## 🚀 Quick Start

1. **Install Live Server** (if not already installed):
   ```bash
   npm install -g live-server
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm start
   ```
   or
   ```bash
   npm run dev
   ```

4. **Open in Browser**: 
   - Automatically opens at `http://localhost:3000`
   - Or manually visit the URL in your browser

## 🎨 Design Features

### Color Palette
- **Primary**: `#00A8CC` (Ocean Blue) - Trust, reliability, water
- **Secondary**: `#FFD23F` (Sun Yellow) - Energy, optimism, action  
- **Accent**: `#00D2FF` (Bright Cyan) - Innovation, freshness
- **Success**: `#4CAF50` (Eco Green) - Environmental action
- **Warning**: `#FF6B35` (Coral Orange) - Urgency, motivation

### Key Features
- 📱 **Mobile-First Design** - Optimized for smartphones
- 🌐 **Progressive Web App** - Installable and works offline
- ♿ **Accessibility Focused** - WCAG guidelines, keyboard navigation
- 🎯 **Interactive Maps** - Find cleanup locations and weather
- 👥 **Social Features** - Crew building and event joining
- 🌤️ **Weather Integration** - Real-time weather for planning

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Custom Properties), Vanilla JavaScript
- **Design**: Mobile-first, responsive design
- **PWA**: Service Worker for offline functionality
- **Maps**: Ready for Leaflet.js integration
- **Dev Tools**: Live Server for development

## 📁 Project Structure

```
shoresquad/
├── css/
│   └── styles.css          # Main stylesheet with color palette
├── js/
│   └── app.js             # Interactive JavaScript features
├── .vscode/
│   └── settings.json      # Live Server configuration
├── index.html             # Main HTML file
├── sw.js                  # Service Worker for PWA
├── package.json           # Project dependencies
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🎯 UX Design Principles

1. **Mobile-First**: Primary usage on smartphones during beach activities
2. **Accessibility**: High contrast ratios, screen reader support
3. **Gamification**: Progress badges, cleanup leaderboards
4. **Simplified Navigation**: Clear CTA buttons, intuitive flow
5. **Quick Actions**: One-tap event joining, easy crew invites

## 🔧 Development

### Available Scripts
- `npm start` - Start Live Server on port 3000
- `npm run dev` - Start with file watching
- `npm run build` - Production build (placeholder)
- `npm test` - Run tests (placeholder)

### Browser Support
- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- Mobile browsers with modern JavaScript support

## 🌟 Features Implemented

### Interactive Elements
- ✅ Responsive navigation with mobile menu
- ✅ Weather widget with geolocation
- ✅ Event filtering and loading
- ✅ Interactive map placeholder (ready for Leaflet.js)
- ✅ Join form with validation
- ✅ Progressive Web App capabilities
- ✅ Smooth scrolling and animations
- ✅ Accessibility features

### Design Features
- ✅ Ocean-inspired color palette
- ✅ Mobile-first responsive design
- ✅ Custom CSS properties for theming
- ✅ Loading states and error handling
- ✅ Notification system
- ✅ Focus management for accessibility

## 🔮 Next Steps

1. **API Integration**: Replace mock data with real APIs
   - Weather API (OpenWeatherMap)
   - Maps API (Google Maps or Mapbox)
   - Backend API for events and users

2. **Advanced Features**:
   - User authentication
   - Real-time notifications
   - Social sharing
   - Offline event creation
   - Photo uploads from cleanups

3. **Performance**:
   - Image optimization
   - Code splitting
   - Advanced caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the package.json for details.

## 💚 Made with Love for Our Oceans

ShoreSquad is designed to mobilize young people for environmental action. Together, we can make waves for change! 🌊