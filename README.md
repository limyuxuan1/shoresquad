# 🌊 ShoreSquad - Beach Cleanup Community

> Rally your crew, track real-time weather from NEA, and hit the next beach cleanup at East Coast Park! 🏖️

**ShoreSquad** is a Progressive Web App (PWA) that connects beach lovers in Singapore to organize community cleanup events. With real-time NEA weather forecasts, interactive Google Maps, and a vibrant Gen-Z aesthetic with Singapore slang, ShoreSquad makes it easy to protect our shores while building a passionate community.

## 🚀 What ShoreSquad Does

- **Real-Time NEA Weather**: Get accurate 24-hour forecasts from Singapore's National Environment Agency API to plan the perfect cleanup day
- **Interactive Beach Maps**: Find East Coast Park cleanup location with embedded Google Maps
- **Community Events**: Discover upcoming beach cleanup events and join the squad
- **Impact Tracking**: See real-time stats - 10kg trash collected, 42 squad members, 3 beaches cleaned, 8 events organized
- **Live Chat Support**: Connect with the community via Tawk.to live chat integration (placeholder ready)
- **Beachy Gen-Z Design**: Mobile-first with blues (#00B4D8), yellows (#FFD60A), rounded cards, and Singapore slang ("lah", "sia", "shiok")

## 🏖️ Local Development Setup

### Prerequisites
- **VS Code** (Visual Studio Code)
- **Live Server Extension** for VS Code ([Download here](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer))

### Running Locally with VS Code

1. **Open the project folder in VS Code**:
   ```
   File → Open Folder → Select C240-vibe-coding
   ```

2. **Install Live Server extension** (if not already installed):
   - Open Extensions panel (`Ctrl+Shift+X` or `Cmd+Shift+X`)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

3. **Start the development server**:
   - Right-click on `index.html` in the Explorer panel
   - Select "Open with Live Server"
   - OR click "Go Live" button in the bottom-right status bar
   - Your browser will open at `http://127.0.0.1:5500/`

4. **Development workflow**:
   - Edit HTML, CSS, or JavaScript files
   - Live Server automatically reloads the browser on save
   - Check browser console (F12) for debugging info

### Alternative: Using npm

### Alternative: Using npm

```bash
npm install
npm start
```

This runs `live-server` on port 3000 with auto-refresh enabled.

## 🌤️ NEA Weather API Integration

ShoreSquad uses Singapore's **National Environment Agency (NEA) 24-Hour Weather Forecast API** to provide real-time weather data.

### API Details
- **Endpoint**: `https://api.data.gov.sg/v1/environment/24-hour-weather-forecast`
- **Authentication**: None required (public API from data.gov.sg)
- **Update Frequency**: Multiple times daily by NEA
- **Data Provided**:
  - General forecast conditions (thundery showers, cloudy, fair, sunny, etc.)
  - Temperature range (low/high in degrees Celsius)
  - Relative humidity percentage (low/high)
  - 24-hour period forecasts (morning, afternoon, evening, night)
  - Regional breakdowns (East region covers East Coast Park area)

### Implementation in ShoreSquad
The weather widget (`js/app.js`) automatically fetches NEA data on page load and displays:
- **Current conditions** with emoji representation (⛈️🌧️🌦️⛅☁️☀️)
- **Temperature range** in Celsius (e.g., "24-32°C")
- **Humidity levels** as percentage range
- **4-period forecast cards** showing conditions throughout the day (Morning, Afternoon, Evening, Night)

### Error Handling
If the NEA API is unavailable or there's no internet connection:
- Shows friendly loading state with animated 🌊 wave emoji
- Displays error message: "⚠️ Oops! Weather data unavailable. Check your connection or try again later."
- Console logs detailed error information for debugging

### Testing Weather Integration
1. Open browser console (F12) when page loads
2. Look for "NEA Weather Data:" log showing the API response
3. Weather widget should update within 1-2 seconds
4. If offline, you'll see the error state instead

## 💬 Tawk.to Live Chat Setup

ShoreSquad includes **Tawk.to** integration for real-time community support and engagement.

### How to Activate Live Chat

1. **Create free Tawk.to account**:
   - Go to [tawk.to](https://www.tawk.to/)
   - Sign up for a free account

2. **Create ShoreSquad property**:
   - In Tawk.to dashboard, create a new property called "ShoreSquad"
   - Customize widget colors to match our beachy theme (blues/yellows)

3. **Get your Widget Code**:
   - Go to Administration → Channels → Chat Widget
   - Copy your unique embed code

4. **Replace placeholder in index.html**:
   - Open `index.html` around line 387
   - Find the Tawk.to script block with comment "REPLACE WITH YOUR ACTUAL TAWK.TO PROPERTY ID"
   - Replace `YOUR_PROPERTY_ID` and `YOUR_WIDGET_ID` in this line:
     ```javascript
     s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
     ```

5. **Test the widget**:
   - Save and refresh your page
   - Chat widget appears in bottom-right corner
   - Test sending a message to yourself

### Tawk.to Features
- **Live chat** with squad members and event organizers
- **Offline messages** when team is unavailable
- **Mobile-responsive** chat interface
- **Customizable branding** to match ShoreSquad colors
- **Free tier** supports unlimited agents and chats

## 🗺️ Google Maps Integration

The cleanup location is displayed using **Google Maps Embed API** with an interactive iframe.

### Current Configuration
- **Location**: East Coast Park, Singapore
- **Coordinates**: Latitude 1.3014, Longitude 103.9137
- **Implementation**: Direct iframe embed (no API key required for basic embeds)
- **Section**: Found in `index.html` around line 214 in the `#map` section

### Changing the Map Location
To update the map to a different beach or cleanup spot:

1. Open `index.html`
2. Find the `<iframe>` in the Map section:
   ```html
   <iframe
       src="https://www.google.com/maps?q=1.3014,103.9137&output=embed"
       ...
   </iframe>
   ```
3. Replace coordinates with new location:
   ```html
   <iframe
       src="https://www.google.com/maps?q=NEW_LAT,NEW_LNG&output=embed"
       ...
   </iframe>
   ```
4. Update the location name in `js/app.js` (around line 12):
   ```javascript
   this.location = {
       name: 'Your New Beach Name',
       lat: NEW_LAT,
       lng: NEW_LNG
   };
   ```

### Adding Multiple Markers (Advanced)
For multiple beach locations with custom markers, consider upgrading to **Google Maps JavaScript API**:
- Requires a Google Cloud Platform API key
- Allows custom markers for each cleanup location
- Info windows with event details and dates
- Route planning between multiple beaches
- Custom styling to match ShoreSquad theme

## 📦 Project Structure

```
C240-vibe-coding/
├── index.html          # Main HTML structure with all sections
│                       # Hero, Features, Map, Events, About, Impact Tracker, Join CTA
├── css/
│   └── styles.css     # Beachy Gen-Z styling with CSS custom properties
│                       # Mobile-first responsive design, card components
├── js/
│   └── app.js         # ShoreSquad class with NEA API integration
│                       # Weather fetching, DOM updates, event handling
├── sw.js              # Service Worker for PWA functionality (offline caching)
├── package.json       # npm dependencies (live-server, leaflet) and scripts
├── .gitignore         # Git ignore rules (node_modules, .DS_Store, .env)
└── README.md          # This file - comprehensive documentation
```

## 🎨 Design System

### Color Palette (Updated Beachy Gen-Z Theme)
- **Primary Blue**: `#00B4D8` (Ocean blue for buttons and primary accents)
- **Secondary Yellow**: `#FFD60A` (Beachy sunshine for highlights and Impact Tracker background)
- **Accent Blue**: `#0077B6` (Deeper blue for hover states and borders)
- **Neutral Dark**: `#2C3E50` (Text and headings for readability)
- **White**: `#FFFFFF` (Card backgrounds and clean surfaces)

### Typography
- **Font Family**: Poppins (Google Fonts) - modern, friendly, Gen-Z aesthetic
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Sizes**: Responsive scaling from 0.875rem (14px) to 3rem (48px)

### UI Components
- **Rounded corners**: 1.5rem to 2.5rem border radius for cards and buttons
- **Card shadows**: Prominent box-shadows with blue tint (rgba(0, 119, 182, 0.2))
- **Hover effects**: Translate Y (-8px) + scale (1.02) animations
- **3px borders**: Thick borders on cards for Gen-Z style
- **Mobile-first grid**: 1 column → 2 columns (tablet) → 4 columns (desktop)

### Singapore Slang Integration
Adds local flavor throughout the UI:
- "Join the Squad Lah!" (Hero CTA button)
- "Check Beach Vibes Lah!" (Map section title)
- "Impact shiok sia!" (Impact Tracker subtitle)
- Beachy emojis: 🌊✨🏖️🤙🐠💚🗑️👥🌟

## 🌐 Deployment to GitHub Pages

### Pre-Deployment Checklist
✅ All file paths are relative and GitHub Pages compatible:
- `index.html` is at root directory
- CSS: `css/styles.css` (relative path ✓)
- JS: `js/app.js` (relative path ✓)
- Service Worker: `sw.js` (root level ✓)
- No absolute paths that would break on GitHub Pages

### Git Commands to Deploy

1. **Stage all your changes**:
   ```powershell
   git add .
   ```

2. **Commit with descriptive message**:
   ```powershell
   git commit -m "Launch ShoreSquad v1.0 - NEA weather, Impact Tracker, Tawk.to ready"
   ```

3. **Push to GitHub**:
   ```powershell
   git push origin main
   ```
   
   *Note: If your default branch is `master`, use `git push origin master`*

### GitHub Pages Configuration Steps

1. **Go to your GitHub repository** in your web browser:
   - Navigate to `https://github.com/YOUR_USERNAME/YOUR_REPO`

2. **Open Settings tab**:
   - Click the "Settings" tab in the top navigation bar

3. **Navigate to Pages section**:
   - Scroll down in the left sidebar
   - Click "Pages" (or go directly to `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/pages`)

4. **Configure deployment source**:
   - **Source**: Deploy from a branch
   - **Branch**: Select `main` from dropdown (or `master` if that's your default)
   - **Folder**: Select `/ (root)` from dropdown
   - Click **Save** button

5. **Wait for deployment** (usually 1-2 minutes):
   - GitHub Actions will automatically build and deploy your site
   - A green checkmark (✓) appears when deployment is complete
   - You'll see a message: "Your site is published at https://YOUR_USERNAME.github.io/YOUR_REPO/"

6. **Access your live ShoreSquad site**:
   - Click the URL or visit: `https://YOUR_USERNAME.github.io/YOUR_REPO/`
   - Example: `https://johndoe.github.io/C240-vibe-coding/`

### Post-Deployment Verification

After your site is live, verify everything works:

1. ✅ **Visit the live URL** and check all sections load correctly
2. ✅ **Test weather widget** - should fetch real NEA data within 1-2 seconds
3. ✅ **Verify Google Maps iframe** displays East Coast Park correctly
4. ✅ **Replace Tawk.to placeholder** with your actual Widget ID (follow setup above)
5. ✅ **Test on mobile devices** - responsive layout should adapt to small screens
6. ✅ **Check browser console** (F12) for any errors or warnings
7. ✅ **Test form submission** - Join CTA form should show success notification
8. ✅ **Verify PWA functionality** - Service Worker should cache assets for offline use

### Troubleshooting Deployment

**Issue**: Site shows 404 error
- **Solution**: Verify branch name is correct (main vs master)
- **Solution**: Ensure `index.html` is at root, not in a subfolder

**Issue**: Weather widget not loading
- **Solution**: Check browser console for CORS errors
- **Solution**: NEA API should work on GitHub Pages (public API, no CORS restrictions)

**Issue**: Maps or images not showing
- **Solution**: Verify all paths are relative (no leading `/`)
- **Solution**: Check that iframe `src` URL is correct

## 🤝 Contributing

Want to join the squad and contribute to ShoreSquad? Here's how:

1. **Fork the repository** on GitHub
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request** with a clear description

### Contribution Ideas
- Add more Singapore beaches (Sentosa, Changi, Pasir Ris)
- Integrate with more NEA APIs (UV Index, PSI, Rainfall)
- Build user authentication and squad profiles
- Create event RSVP system with calendar integration
- Gamification: Badges for cleanup milestones

## 📄 License

This project is open-source and available for educational purposes. Feel free to use, modify, and share!

## 🙌 Credits & Acknowledgments

- **Weather Data**: National Environment Agency (NEA) Singapore - [data.gov.sg](https://data.gov.sg)
- **Maps**: Google Maps Platform
- **Live Chat**: Tawk.to free live chat widget
- **Fonts**: Google Fonts - Poppins typeface
- **Icons & Emojis**: Native Unicode emojis for cross-platform compatibility
- **Design**: Built with ❤️ for Singapore's beaches and environment

## 📞 Support & Contact

Need help or have questions about ShoreSquad?
- **Live Chat**: Activate Tawk.to widget on the live site
- **Issues**: Open a GitHub Issue in this repository
- **Email**: [Add your contact email here]

---

**Ready to make waves? Join ShoreSquad today and let's keep our shores clean, lah!** 🌊✨🏖️

*Last updated: January 2025*
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