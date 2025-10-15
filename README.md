# NASA API React Application

**Modernized React 18 application** (January 2025) that displays space-related content from NASA's public APIs, including Astronomy Picture of the Day, Mars Rover photos, Earth imagery, and multimedia search.

> ✅ **Status**: Production-ready | All 6 modernization phases completed | Zero build warnings | 73KB gzipped bundle

## Features

- ✅ **Astronomy Picture of the Day (APOD)**: Browse daily astronomy images with descriptions and date navigation
- ✅ **EPIC Earth Imagery**: View Earth photos from the DSCOVR spacecraft with date filtering
- ✅ **Mars Rover Photos**: Explore photos from NASA's Curiosity rover with pagination
- ✅ **Multimedia Search**: Search NASA's vast image and video library with filters and pagination
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✅ **Error Handling**: Enhanced error boundaries with componentDidCatch and logging
- ✅ **Modern React 18**: Using createRoot API and optimized hooks
- ✅ **Production Ready**: Dockerized with Nginx, health checks, and HTTPS support

> **Note**: Mars Weather feature removed (InSight mission ended Feb 2023, API deprecated)

## Live Demo

Production site: [nasaapp.davidfdzmorilla.dev](https://nasaapp.davidfdzmorilla.dev)

## Technology Stack (Updated January 2025)

- **React** 18.3.1 with modern hooks and createRoot API ✅
- **React Router** v6.30.1 for navigation ✅
- **React Icons** 4.12.0 for UI icons ✅
- **react-lazy-load** 4.0.1 for image optimization (React 18 compatible) ✅
- **Create React App** 5.0.1 build system ✅
- **Docker** multi-stage build (Node 18 + Nginx Alpine) ✅
- **Nginx** with custom config (gzip, caching, SPA routing, security headers) ✅
- **Testing**: @testing-library/react 13.4.0 (React 18 compatible) ✅

**Removed Dependencies**: react-redux, redux (unused, saved ~60KB from bundle)

## Prerequisites

- **Node.js** 18+ and npm (tested with Node 18 Alpine)
- **NASA API Key** (free from [api.nasa.gov](https://api.nasa.gov))
- **Docker** (optional, for containerized deployment)

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
# Make sure .env file has your NASA API key
docker compose up -d --build
```

This will:
1. Inject NASA API key at build-time
2. Build the React app (optimized production build)
3. Create a Docker image with Nginx Alpine
4. Start the container on port 3001 with health checks
5. Configure Traefik reverse proxy with HTTPS/TLS

### Manual Docker build

```bash
# Build with API key injection
docker build --build-arg REACT_APP_NASA_API_KEY=$(grep REACT_APP_NASA_API_KEY .env | cut -d '=' -f2) -t nasa-api-app .

# Run container
docker run -d -p 3001:80 --name nasa-app nasa-api-app

# Check health
curl http://localhost:3001/health
```

The app will be available at [http://localhost:3001](http://localhost:3001).

### Docker Configuration

- **Multi-stage build**: Node 18 Alpine (build) → Nginx Alpine (serve)
- **Port mapping**: External 3001 → Internal 80
- **Health check**: `/health` endpoint (30s interval, 3s timeout)
- **Environment vars**: Build-time injection via ARG/ENV
- **nginx.conf**: Custom config with SPA routing, gzip, caching, security headers
- **Traefik integration**: HTTPS/TLS with automatic certificate resolution
- **Production domain**: nasaapp.davidfdzmorilla.dev
- **Image size**: ~59 MB (optimized multi-stage build)

For comprehensive deployment guide, see [`.claude/DEPLOYMENT.md`](.claude/DEPLOYMENT.md).

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

### 4. Mars Weather ❌
- **Status**: **REMOVED** (InSight mission ended Feb 2023, API deprecated)
- **Previous Component**: `src/pages/MarsWeather.js` (deleted)
- **Note**: Feature removed in Phase 3 modernization

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

## Known Issues (Post-Modernization)

### CRA Vulnerabilities
The project has 9 npm vulnerabilities (3 moderate, 6 high) from react-scripts dependencies. These are known Create React App issues:
- **Status**: Cannot be fixed without migrating from CRA to Vite
- **Impact**: Low - vulnerabilities are in dev dependencies, not production bundle
- **Recommendation**: Consider migrating to Vite in 2025-2026 for better performance and security

### No Other Known Issues ✅
All other issues have been resolved during the January 2025 modernization:
- ✅ Dependencies updated to latest compatible versions
- ✅ Security vulnerability (hardcoded API key) fixed
- ✅ Mars Weather API removed (deprecated)
- ✅ React patterns modernized to React 18
- ✅ ESLint warnings resolved (zero warnings)
- ✅ Docker deployment optimized

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

## Modernization Completed (January 2025) ✅

All 6 phases completed successfully. See [`.claude/MODERNIZATION_SUMMARY.md`](.claude/MODERNIZATION_SUMMARY.md) for detailed report.

**Completed Phases**:
- ✅ **Phase 0**: Assessment - Audited dependencies, identified issues
- ✅ **Phase 1**: Foundation Updates - Updated React, Router, testing libraries
- ✅ **Phase 2**: Dependency Modernization - Updated all packages, removed Redux
- ✅ **Phase 3**: Bug Fixes - Removed Mars Weather, fixed security issue, cleaned code
- ✅ **Phase 4**: Code Quality - Migrated to React 18 API, optimized hooks
- ✅ **Phase 5**: Deployment - Enhanced Docker setup, added health checks, nginx config
- ✅ **Phase 6**: Documentation - Comprehensive guides for deployment and maintenance

**Key Achievements**:
- 🔒 **Security**: Fixed hardcoded API key vulnerability
- ⚡ **Performance**: Reduced bundle size by 60KB (removed Redux)
- 🚀 **Modern**: React 18.3.1, Router 6.30.1, all latest compatible versions
- 📦 **Optimized**: 73KB gzipped bundle, zero build warnings
- 🐳 **Production-Ready**: Docker with health checks, nginx optimizations, HTTPS
- 📚 **Documented**: 4 comprehensive guides in `.claude/` directory

**Documentation**:
- [MODERNIZATION_SUMMARY.md](.claude/MODERNIZATION_SUMMARY.md) - Complete modernization report
- [DEPLOYMENT.md](.claude/DEPLOYMENT.md) - Deployment guide
- [MAINTENANCE.md](.claude/MAINTENANCE.md) - Maintenance recommendations
- [CLAUDE.md](CLAUDE.md) - Architecture and patterns
- [NASA_API_DOCUMENTATION.md](.claude/NASA_API_DOCUMENTATION.md) - API reference

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

**Modernization Status**: ✅ COMPLETE (January 2025)
**Production Status**: ✅ READY FOR DEPLOYMENT
**Build Status**: ✅ Zero warnings, zero errors
**Bundle Size**: 73KB gzipped (60.17KB JS + 12.65KB CSS)

For maintenance schedule and future updates, see [`.claude/MAINTENANCE.md`](.claude/MAINTENANCE.md).
