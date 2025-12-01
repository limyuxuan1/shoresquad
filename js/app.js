/**
 * ShoreSquad - Interactive JavaScript Application
 * Features: Weather API, Maps, Social Features, PWA Capabilities
 * Author: ShoreSquad Team
 */

class ShoreSquad {
    constructor() {
        this.config = {
            apiKeys: {
                weather: 'YOUR_WEATHER_API_KEY', // Replace with actual API key
                maps: 'YOUR_MAPS_API_KEY' // Replace with actual API key
            },
            apiEndpoints: {
                weather: 'https://api.openweathermap.org/data/2.5/weather',
                events: '/api/events', // Backend endpoint
                users: '/api/users' // Backend endpoint
            },
            defaultLocation: {
                lat: 1.3521, // Singapore latitude
                lng: 103.8198 // Singapore longitude
            }
        };

        this.state = {
            currentUser: null,
            events: [],
            weather: null,
            map: null,
            filters: {
                active: 'all'
            }
        };

        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        this.showLoading();
        
        try {
            await this.setupEventListeners();
            await this.initializeWeatherWidget();
            await this.loadEvents();
            this.setupNavigation();
            this.setupAccessibility();
            this.initializePWA();
            
            // Simulate loading delay for better UX
            setTimeout(() => {
                this.hideLoading();
            }, 1000);
            
            console.log('ShoreSquad initialized successfully! 🌊');
        } catch (error) {
            console.error('Error initializing ShoreSquad:', error);
            this.hideLoading();
            this.showError('Failed to initialize the app. Please refresh and try again.');
        }
    }

    /**
     * Set up event listeners for interactive elements
     */
    setupEventListeners() {
        // Navigation toggle for mobile
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isOpen = navMenu.classList.contains('open');
                navMenu.classList.toggle('open');
                navToggle.setAttribute('aria-expanded', !isOpen);
            });
        }

        // Hero action buttons
        this.setupButton('#join-now-btn', () => this.scrollToSection('#join'));
        this.setupButton('#view-events-btn', () => this.scrollToSection('#events'));

        // Map initialization
        this.setupButton('#init-map-btn', () => this.initializeMap());

        // Event filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterEvents(filter);
            });
        });

        // Join form
        const joinForm = document.getElementById('join-form');
        if (joinForm) {
            joinForm.addEventListener('submit', (e) => this.handleJoinSubmit(e));
        }

        // Load more events
        this.setupButton('#load-more-events', () => this.loadMoreEvents());

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    this.scrollToSection(link.getAttribute('href'));
                }
            });
        });

        // Window events
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 100));
        window.addEventListener('resize', this.throttle(() => this.handleResize(), 250));
    }

    /**
     * Set up button click handler
     */
    setupButton(selector, handler) {
        const button = document.querySelector(selector);
        if (button) {
            button.addEventListener('click', handler);
        }
    }

    /**
     * Initialize weather widget with geolocation and API
     */
    async initializeWeatherWidget() {
        try {
            const position = await this.getCurrentLocation();
            const weather = await this.fetchWeather(position.coords.latitude, position.coords.longitude);
            this.updateWeatherDisplay(weather);
        } catch (error) {
            console.log('Using default location for weather');
            const weather = await this.fetchWeather(
                this.config.defaultLocation.lat, 
                this.config.defaultLocation.lng
            );
            this.updateWeatherDisplay(weather);
        }
    }

    /**
     * Get user's current location
     */
    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            });
        });
    }

    /**
     * Fetch weather data from API
     */
    async fetchWeather(lat, lng) {
        // Mock weather data for demo (replace with actual API call)
        const mockWeather = {
            temperature: Math.floor(Math.random() * 10) + 20, // 20-30°C
            condition: ['Sunny', 'Partly Cloudy', 'Clear', 'Breezy'][Math.floor(Math.random() * 4)],
            icon: ['☀️', '⛅', '🌤️', '🌊'][Math.floor(Math.random() * 4)]
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return mockWeather;

        // Uncomment for actual API call:
        /*
        const response = await fetch(
            `${this.config.apiEndpoints.weather}?lat=${lat}&lon=${lng}&appid=${this.config.apiKeys.weather}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Weather API request failed');
        }
        
        const data = await response.json();
        return {
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].description,
            icon: this.getWeatherIcon(data.weather[0].icon)
        };
        */
    }

    /**
     * Update weather display in UI
     */
    updateWeatherDisplay(weather) {
        const tempElement = document.getElementById('weather-temp');
        const conditionElement = document.getElementById('weather-condition');

        if (tempElement) {
            tempElement.textContent = `${weather.temperature}°C`;
        }

        if (conditionElement) {
            conditionElement.textContent = `${weather.icon} ${weather.condition}`;
        }

        this.state.weather = weather;
    }

    /**
     * Load and display cleanup events
     */
    async loadEvents() {
        try {
            // Mock event data (replace with actual API call)
            const mockEvents = [
                {
                    id: 1,
                    title: 'Pasir Ris Beach Cleanup',
                    date: 'Dec 15',
                    location: 'Pasir Ris Beach, Singapore',
                    participants: 18,
                    weather: '☀️ 26°C',
                    category: 'weekend',
                    featured: true
                },
                {
                    id: 2,
                    title: 'East Coast Park Morning Clean',
                    date: 'Dec 18',
                    location: 'East Coast Park, Singapore',
                    participants: 8,
                    weather: '🌤️ 26°C',
                    category: 'today'
                },
                {
                    id: 3,
                    title: 'Changi Beach Environmental Action',
                    date: 'Dec 20',
                    location: 'Changi Beach, Singapore',
                    participants: 15,
                    weather: '⛅ 23°C',
                    category: 'nearby'
                }
            ];

            this.state.events = mockEvents;
            this.renderEvents(mockEvents);
        } catch (error) {
            console.error('Error loading events:', error);
            this.showError('Failed to load events. Please try again later.');
        }
    }

    /**
     * Render events in the UI
     */
    renderEvents(events) {
        const eventsGrid = document.getElementById('events-grid');
        if (!eventsGrid) return;

        // Keep first event card as template, remove others
        const firstCard = eventsGrid.querySelector('.event-card');
        const existingCards = eventsGrid.querySelectorAll('.event-card:not(:first-child)');
        existingCards.forEach(card => card.remove());

        events.forEach((event, index) => {
            if (index === 0 && firstCard) {
                // Update first card
                this.updateEventCard(firstCard, event);
            } else {
                // Create new cards
                const eventCard = this.createEventCard(event);
                eventsGrid.appendChild(eventCard);
            }
        });
    }

    /**
     * Create event card element
     */
    createEventCard(event) {
        const card = document.createElement('div');
        card.className = event.featured ? 'event-card event-card--featured' : 'event-card';
        card.innerHTML = `
            ${event.featured ? '<div class="event-card__badge">Next Cleanup</div>' : ''}
            <div class="event-card__header">
                <span class="event-card__date">${event.date}</span>
                <span class="event-card__weather">${event.weather}</span>
            </div>
            <h3 class="event-card__title">${event.title}</h3>
            <p class="event-card__location">📍 ${event.location}</p>
            <p class="event-card__participants">👥 ${event.participants} squad members joining</p>
            <button class="btn btn--small btn--primary" onclick="shoreSquad.joinEvent(${event.id})">
                Join Event
            </button>
        `;

        // Add animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);

        return card;
    }

    /**
     * Update existing event card
     */
    updateEventCard(card, event) {
        const dateElement = card.querySelector('.event-card__date');
        const weatherElement = card.querySelector('.event-card__weather');
        const titleElement = card.querySelector('.event-card__title');
        const locationElement = card.querySelector('.event-card__location');
        const participantsElement = card.querySelector('.event-card__participants');
        const button = card.querySelector('.btn');

        if (dateElement) dateElement.textContent = event.date;
        if (weatherElement) weatherElement.textContent = event.weather;
        if (titleElement) titleElement.textContent = event.title;
        if (locationElement) locationElement.textContent = `📍 ${event.location}`;
        if (participantsElement) participantsElement.textContent = `👥 ${event.participants} squad members joining`;
        if (button) {
            button.setAttribute('onclick', `shoreSquad.joinEvent(${event.id})`);
        }
    }

    /**
     * Filter events by category
     */
    filterEvents(filter) {
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('filter-btn--active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('filter-btn--active');
            }
        });

        this.state.filters.active = filter;

        // Filter events
        let filteredEvents = this.state.events;
        if (filter !== 'all') {
            filteredEvents = this.state.events.filter(event => event.category === filter);
        }

        this.renderEvents(filteredEvents);
    }

    /**
     * Handle joining an event
     */
    joinEvent(eventId) {
        const event = this.state.events.find(e => e.id === eventId);
        if (!event) return;

        // Simulate joining animation
        this.showNotification(`Successfully joined "${event.title}"! 🌊`, 'success');
        
        // Update participant count
        event.participants += 1;
        this.renderEvents(this.getFilteredEvents());
    }

    /**
     * Get currently filtered events
     */
    getFilteredEvents() {
        if (this.state.filters.active === 'all') {
            return this.state.events;
        }
        return this.state.events.filter(event => event.category === this.state.filters.active);
    }

    /**
     * Load more events (pagination)
     */
    async loadMoreEvents() {
        this.showLoading();
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock additional events
        const newEvents = [
            {
                id: 4,
                title: 'Marina Bay Sunrise Cleanup',
                date: 'Dec 22',
                location: 'Marina Bay, Singapore',
                participants: 6,
                weather: '🌅  25°C',
                category: 'weekend'
            },
            {
                id: 5,
                title: 'Pulau Ubin Adventure Clean',
                date: 'Dec 25',
                location: 'Pulau Ubin, Singapore',
                participants: 20,
                weather: '☀️ 27°C',
                category: 'nearby'
            }
        ];

        this.state.events.push(...newEvents);
        this.renderEvents(this.getFilteredEvents());
        this.hideLoading();
        
        this.showNotification('Loaded more cleanup events! 🏄‍♀️', 'info');
    }

    /**
     * Initialize interactive map
     */
    async initializeMap() {
        const mapContainer = document.getElementById('cleanup-map');
        if (!mapContainer) return;

        try {
            // Replace placeholder with map loading message
            mapContainer.innerHTML = `
                <div class="map-loading">
                    <p>🗺️ Loading interactive map...</p>
                    <div class="loading-spinner"></div>
                </div>
            `;

            // Simulate map loading
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock map interface (replace with actual map library like Leaflet)
            mapContainer.innerHTML = `
                <div class="map-interface">
                    <div class="map-controls">
                        <button class="map-btn" onclick="shoreSquad.showNearbyEvents()">📍 Nearby Events</button>
                        <button class="map-btn" onclick="shoreSquad.showWeatherLayer()">🌤️ Weather Layer</button>
                    </div>
                    <div class="map-markers">
                        <div class="marker marker--event" style="top: 40%; left: 30%;">
                            <span class="marker__icon">🏖️</span>
                            <div class="marker__popup">Sentosa Beach Cleanup</div>
                        </div>
                        <div class="marker marker--event" style="top: 60%; left: 70%;">
                            <span class="marker__icon">🏖️</span>
                            <div class="marker__popup">East Coast Park Clean</div>
                        </div>
                        <div class="marker marker--weather" style="top: 20%; left: 50%;">
                            <span class="marker__icon">☀️</span>
                            <div class="marker__popup">25°C Sunny</div>
                        </div>
                    </div>
                    <div class="map-background">
                        <p>🗺️ Interactive Map View</p>
                        <p style="font-size: 0.8em; opacity: 0.7;">Click markers for details</p>
                    </div>
                </div>
            `;

            // Add map styles
            this.addMapStyles();
            
            this.showNotification('Map loaded successfully! 🗺️', 'success');
        } catch (error) {
            console.error('Error initializing map:', error);
            mapContainer.innerHTML = `
                <div class="map-error">
                    <p>❌ Failed to load map</p>
                    <button class="btn btn--small btn--primary" onclick="shoreSquad.initializeMap()">
                        Try Again
                    </button>
                </div>
            `;
        }
    }

    /**
     * Add dynamic styles for map
     */
    addMapStyles() {
        if (document.getElementById('map-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'map-styles';
        styles.textContent = `
            .map-interface {
                position: relative;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
                overflow: hidden;
            }
            
            .map-controls {
                position: absolute;
                top: 10px;
                left: 10px;
                z-index: 10;
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }
            
            .map-btn {
                padding: 8px 12px;
                background: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                font-size: 0.8rem;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                transition: all 0.2s ease;
            }
            
            .map-btn:hover {
                background: #f0f9ff;
                transform: translateY(-1px);
            }
            
            .map-markers {
                position: relative;
                width: 100%;
                height: 100%;
            }
            
            .marker {
                position: absolute;
                cursor: pointer;
                transform: translate(-50%, -100%);
                transition: all 0.2s ease;
            }
            
            .marker:hover {
                transform: translate(-50%, -100%) scale(1.1);
            }
            
            .marker__icon {
                display: block;
                font-size: 1.5rem;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
            }
            
            .marker__popup {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.7rem;
                white-space: nowrap;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.2s ease;
            }
            
            .marker:hover .marker__popup {
                opacity: 1;
            }
            
            .map-background {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: #666;
                z-index: 1;
            }
            
            .map-loading, .map-error {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                gap: 1rem;
                color: #666;
            }
        `;
        
        document.head.appendChild(styles);
    }

    /**
     * Show nearby events on map
     */
    showNearbyEvents() {
        this.showNotification('Showing nearby cleanup events 📍', 'info');
        // Add animation to nearby markers
        document.querySelectorAll('.marker--event').forEach((marker, index) => {
            setTimeout(() => {
                marker.style.animation = 'bounce 0.6s ease-in-out';
            }, index * 200);
        });
    }

    /**
     * Show weather layer on map
     */
    showWeatherLayer() {
        this.showNotification('Weather overlay activated 🌤️', 'info');
        // Add animation to weather markers
        document.querySelectorAll('.marker--weather').forEach((marker, index) => {
            setTimeout(() => {
                marker.style.animation = 'pulse 1s ease-in-out infinite';
            }, index * 200);
        });
    }

    /**
     * Handle join form submission
     */
    async handleJoinSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const emailInput = form.querySelector('#email');
        const errorElement = form.querySelector('#email-error');
        
        // Clear previous errors
        errorElement.textContent = '';
        emailInput.classList.remove('error');
        
        // Validate email
        const email = emailInput.value.trim();
        if (!email) {
            this.showFieldError(emailInput, errorElement, 'Email is required');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showFieldError(emailInput, errorElement, 'Please enter a valid email address');
            return;
        }
        
        try {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = '🌊 Joining...';
            submitButton.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            this.showNotification(`Welcome to ShoreSquad, ${email}! 🚀`, 'success');
            form.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
        } catch (error) {
            console.error('Join form error:', error);
            this.showNotification('Failed to join. Please try again later.', 'error');
            
            // Reset button
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = '🚀 Join ShoreSquad';
            submitButton.disabled = false;
        }
    }

    /**
     * Show field validation error
     */
    showFieldError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        input.focus();
    }

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Set up navigation behavior
     */
    setupNavigation() {
        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
        
        const updateActiveNav = () => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };
        
        window.addEventListener('scroll', this.throttle(updateActiveNav, 100));
    }

    /**
     * Set up accessibility features
     */
    setupAccessibility() {
        // Add focus management for mobile menu
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');
        const navLinks = navMenu?.querySelectorAll('.nav__link');
        
        if (navToggle && navMenu && navLinks) {
            navToggle.addEventListener('click', () => {
                const isOpen = navMenu.classList.contains('open');
                if (isOpen) {
                    // Focus first nav link when menu opens
                    navLinks[0]?.focus();
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.focus();
                }
            });
        }
        
        // Add keyboard navigation for event cards
        document.querySelectorAll('.event-card').forEach(card => {
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const button = card.querySelector('.btn');
                    if (button) button.click();
                }
            });
        });
    }

    /**
     * Initialize Progressive Web App features
     */
    initializePWA() {
        // Check for service worker support
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }
        
        // Handle install prompt
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            this.showInstallPrompt(deferredPrompt);
        });
        
        // Handle app installed
        window.addEventListener('appinstalled', () => {
            this.showNotification('ShoreSquad installed successfully! 📱', 'success');
        });
    }

    /**
     * Register service worker
     */
    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered successfully');
            
            // Handle updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        this.showUpdatePrompt();
                    }
                });
            });
        } catch (error) {
            console.log('Service Worker registration failed:', error);
        }
    }

    /**
     * Show app install prompt
     */
    showInstallPrompt(deferredPrompt) {
        const installNotification = document.createElement('div');
        installNotification.className = 'install-prompt';
        installNotification.innerHTML = `
            <div class="install-prompt__content">
                <span class="install-prompt__text">📱 Install ShoreSquad for the best experience!</span>
                <div class="install-prompt__actions">
                    <button class="btn btn--small btn--primary" id="install-btn">Install</button>
                    <button class="btn btn--small btn--secondary" id="dismiss-btn">Later</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(installNotification);
        
        // Handle install
        document.getElementById('install-btn').addEventListener('click', async () => {
            deferredPrompt.prompt();
            const result = await deferredPrompt.userChoice;
            if (result.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            installNotification.remove();
        });
        
        // Handle dismiss
        document.getElementById('dismiss-btn').addEventListener('click', () => {
            installNotification.remove();
        });
    }

    /**
     * Show update prompt
     */
    showUpdatePrompt() {
        this.showNotification(
            'New version available! Refresh to update.',
            'info',
            () => window.location.reload()
        );
    }

    /**
     * Scroll to section smoothly
     */
    scrollToSection(selector) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        const headerHeight = 70;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        const scrolled = window.scrollY;
        const header = document.querySelector('.header');
        
        // Update header background opacity
        if (header) {
            if (scrolled > 50) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            const speed = 0.5;
            hero.style.transform = `translateY(${scrolled * speed}px)`;
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            const navMenu = document.querySelector('.nav__menu');
            const navToggle = document.querySelector('.nav__toggle');
            
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle?.setAttribute('aria-expanded', 'false');
            }
        }
    }

    /**
     * Show loading indicator
     */
    showLoading() {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.classList.add('show');
            loadingIndicator.setAttribute('aria-hidden', 'false');
        }
    }

    /**
     * Hide loading indicator
     */
    hideLoading() {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.classList.remove('show');
            loadingIndicator.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * Show notification to user
     */
    showNotification(message, type = 'info', action = null) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                ${action ? '<button class="notification__action">Action</button>' : ''}
                <button class="notification__close" aria-label="Close notification">✕</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Handle close
        notification.querySelector('.notification__close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Handle action
        if (action) {
            notification.querySelector('.notification__action').addEventListener('click', () => {
                action();
                notification.remove();
            });
        }
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Add notification styles
        this.addNotificationStyles();
    }

    /**
     * Show error message
     */
    showError(message) {
        this.showNotification(message, 'error');
    }

    /**
     * Add notification styles dynamically
     */
    addNotificationStyles() {
        if (document.getElementById('notification-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                max-width: 400px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                border-left: 4px solid var(--primary-color);
                animation: slideIn 0.3s ease-out;
            }
            
            .notification--success { border-left-color: var(--success-color); }
            .notification--error { border-left-color: var(--warning-color); }
            .notification--info { border-left-color: var(--accent-color); }
            
            .notification__content {
                padding: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification__message {
                flex: 1;
                font-size: 0.9rem;
            }
            
            .notification__action {
                padding: 4px 8px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.8rem;
            }
            
            .notification__close {
                background: none;
                border: none;
                font-size: 1rem;
                cursor: pointer;
                opacity: 0.6;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification__close:hover {
                opacity: 1;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .install-prompt {
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 16px;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                animation: slideUp 0.3s ease-out;
            }
            
            .install-prompt__content {
                display: flex;
                align-items: center;
                gap: 16px;
                flex-wrap: wrap;
            }
            
            .install-prompt__text {
                flex: 1;
                min-width: 200px;
            }
            
            .install-prompt__actions {
                display: flex;
                gap: 8px;
            }
            
            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 768px) {
                .notification {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
                
                .install-prompt__content {
                    flex-direction: column;
                    align-items: stretch;
                    text-align: center;
                }
                
                .install-prompt__actions {
                    justify-content: center;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }

    /**
     * Throttle function calls
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Debounce function calls
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.shoreSquad = new ShoreSquad();
});

// Add additional animations
document.addEventListener('DOMContentLoaded', () => {
    // Add bounce animation keyframes
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transform: translate(-50%, -100%) scale(1);
            }
            40%, 43% {
                transform: translate(-50%, -100%) scale(1.1) translateY(-10px);
            }
            70% {
                transform: translate(-50%, -100%) scale(1.05) translateY(-5px);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: translate(-50%, -100%) scale(1);
            }
            50% {
                transform: translate(-50%, -100%) scale(1.05);
            }
            100% {
                transform: translate(-50%, -100%) scale(1);
            }
        }
        
        .join-form__input.error {
            border-color: var(--warning-color);
            box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.3);
        }
        
        .nav__link.active {
            color: var(--primary-color);
            font-weight: var(--font-weight-semibold);
        }
    `;
    document.head.appendChild(animationStyles);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoreSquad;
}