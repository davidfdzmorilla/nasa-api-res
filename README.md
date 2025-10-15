# NASA API React Application

React application that displays space-related content from NASA's public APIs, including Astronomy Picture of the Day, Mars Rover photos, Earth imagery, and more.

## Features

- **Astronomy Picture of the Day (APOD)**: Browse daily astronomy images with descriptions and date navigation
- **EPIC Earth Imagery**: View Earth photos from the DSCOVR spacecraft
- **Mars Rover Photos**: Explore photos from NASA's Curiosity rover with pagination
- **Mars Weather**: Display Mars weather data from InSight lander (⚠️ Currently deprecated)
- **Multimedia Search**: Search NASA's vast image and video library
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Graceful error boundaries and loading states

## Live Demo

Production site: [nasaapp.davidfdzmorilla.dev](https://nasaapp.davidfdzmorilla.dev)

## Technology Stack

- **React** 18.0.0 (with hooks)
- **React Router** v6 for navigation
- **React Icons** for UI icons
- **react-lazy-load** for image optimization
- **Create React App** build system
- **Docker** for containerization
- **Nginx** for production serving

## Prerequisites

- Node.js 16+ and npm
- NASA API Key (free from [api.nasa.gov](https://api.nasa.gov))
- Docker (optional, for containerized deployment)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd nasa-api-res
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.template .env
```

Edit `.env` and add your NASA API key:

```
REACT_APP_NASA_API_KEY=your_api_key_here
```

Get your free API key from [NASA API Portal](https://api.nasa.gov/).

### 4. Run the development server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

- Hot reloading enabled
- Lint errors shown in console

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build/` folder.

- Bundles React in production mode
- Optimizes for best performance
- Output is minified with hashed filenames

## Docker Deployment

### Build and run with Docker Compose

```bash
docker compose up -d
```

This will:
1. Build the React app
2. Create a production Docker image with Nginx
3. Start the container on port 3001
4. Configure Traefik reverse proxy labels

### Manual Docker build

```bash
docker build -t nasa-api-app .
docker run -p 3001:80 nasa-api-app
```

The app will be available at [http://localhost:3001](http://localhost:3001).

### Docker Configuration

- **Multi-stage build**: Builds React app, then serves with Nginx
- **Port mapping**: External 3001 → Internal 80
- **Traefik integration**: Configured for reverse proxy routing
- **Production domain**: nasaapp.davidfdzmorilla.dev

## Project Structure

```
nasa-api-res/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   │   ├── Header.js
│   │   ├── Loading.js
│   │   ├── Error404.js
│   │   ├── EpicImage.js
│   │   └── PreviewCardMultimedia.js
│   ├── pages/          # Page components
│   │   ├── Home.js
│   │   ├── PictureOfTheDay.js
│   │   ├── Epic.js
│   │   ├── MarsRoverPhotos.js
│   │   ├── MarsWeather.js
│   │   └── Multimedia.js
│   ├── routes/         # React Router configuration
│   │   └── RoutesComponent.js
│   ├── utils/          # Utilities
│   │   └── ErrorBoundary.js
│   ├── App.js          # Root component
│   └── index.js        # Entry point
├── Dockerfile          # Multi-stage Docker build
├── compose.yml         # Docker Compose configuration
├── .env.template       # Environment variables template
├── CLAUDE.md          # Project documentation for AI assistants
└── package.json       # Dependencies and scripts
```

## NASA API Endpoints Used

### 1. APOD - Astronomy Picture of the Day
- **Endpoint**: `https://api.nasa.gov/planetary/apod`
- **Features**: Daily astronomy images, date navigation
- **Component**: `src/pages/PictureOfTheDay.js`

### 2. EPIC - Earth Polychromatic Imaging Camera
- **Endpoint**: `https://api.nasa.gov/EPIC/api/natural`
- **Features**: Earth photos from DSCOVR spacecraft
- **Component**: `src/pages/Epic.js`

### 3. Mars Rover Photos
- **Endpoint**: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`
- **Features**: Photos from Curiosity rover, pagination
- **Component**: `src/pages/MarsRoverPhotos.js`

### 4. Mars Weather ⚠️
- **Status**: **Deprecated** (InSight mission ended Feb 2023)
- **Component**: `src/pages/MarsWeather.js`
- **Note**: Needs migration to alternative data source

### 5. NASA Image and Video Library
- **Endpoint**: `https://images-api.nasa.gov/search`
- **Features**: Search NASA's media library, pagination
- **Component**: `src/pages/Multimedia.js`

## Key Features & Patterns

### Scroll to Top Button
Pages with long content (EPIC, Mars Rover, Multimedia) include a "scroll to top" button that appears when scrolling down.

### Pagination
Mars Rover Photos and Multimedia Search implement pagination with:
- Next/Previous buttons
- Current page display
- Automatic scroll to top on page change

### Loading States
All pages show a loading indicator while fetching data from NASA APIs.

### Error Handling
- Custom `ErrorBoundary` component catches React errors
- API errors display user-friendly messages
- 404 page for invalid routes

### Lazy Loading
Images use `react-lazy-load` for performance optimization and better user experience.

## Known Issues

### Mars Weather API (InSight)
The Mars Weather feature is currently non-functional because:
- NASA's InSight lander mission ended in February 2023
- The original API endpoint has been deprecated
- **Fix needed**: Migrate to alternative Mars weather data source or remove feature

### Outdated Dependencies
The project uses React 18.0.0 and other packages from 2022. Consider updating to:
- React 18.3.1+
- React Router 6.30.1+
- Latest versions of utility libraries

## Troubleshooting

### API Rate Limits
NASA APIs have rate limits. If you encounter 429 errors:
- Use your own API key (not the DEMO_KEY)
- Implement request caching
- Add delays between rapid requests

### Build Failures
If `npm run build` fails:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Docker Build Issues
If Docker build is slow or fails:
- Ensure `node_modules` is in `.dockerignore`
- Check available disk space
- Verify Docker has enough memory allocated

### CORS Errors
NASA APIs support CORS, but if you encounter issues:
- Ensure you're using the correct endpoint URLs
- Check that your API key is valid
- Verify network connectivity

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Modernization Roadmap

See `.claude/agents/orchestrator/project-manager.md` for the complete modernization plan.

**Current Phase**: Phase 0 - Assessment

**Planned improvements**:
- Update all dependencies to latest compatible versions
- Fix Mars Weather API integration
- Remove unused dependencies (Redux)
- Improve error handling and loading states
- Optimize performance
- Enhance Docker deployment
- Update documentation

## Resources

- [NASA API Portal](https://api.nasa.gov/)
- [NASA API Documentation](https://api.nasa.gov/docs/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Create React App Documentation](https://create-react-app.dev/)

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- NASA for providing free public APIs
- Create React App for the build tooling
- React community for excellent libraries and documentation

---

**Note**: This is a legacy application from 2022 currently undergoing modernization. Some features may be temporarily unavailable during updates.
