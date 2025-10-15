# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Modernized React 18 application** (updated January 2025) that interfaces with NASA APIs to display space-related content including Astronomy Picture of the Day (APOD), EPIC Earth imagery, Mars Rover photos, and multimedia search functionality.

**Last Modernization**: January 2025 - All 6 phases completed
**Status**: Production-ready with modern React 18 patterns, optimized Docker deployment, and comprehensive documentation

## Development Commands

- `npm start` - Run development server (http://localhost:3000)
- `npm test` - Run tests in watch mode
- `npm run build` - Create production build in `build/` folder

## Docker Deployment

- `docker compose up -d --build` - Build and run containerized app with Nginx
- Multi-stage Dockerfile (Node 18 + Nginx Alpine) builds React app and serves on port 80
- Container exposes port 3001 externally (maps to 80 internally)
- Configured with Traefik reverse proxy labels for HTTPS/TLS
- Includes health check endpoint at `/health`
- Build-time API key injection via ARG/ENV
- See `.claude/DEPLOYMENT.md` for comprehensive deployment guide

## Environment Setup

Create `.env` file from `.env.template`:
```
REACT_APP_NASA_API_KEY=your_api_key_here
```

NASA API key required for:
- Picture of the Day (`PictureOfTheDay.js`)
- Mars Rover Photos (`MarsRoverPhotos.js`)

## Architecture

### Application Structure

- **Entry Point**: `src/index.js` uses React 18 `createRoot` API, wraps app in `BrowserRouter` and `ErrorBoundary`
- **Root Component**: `src/App.js` manages scroll state and renders `Header` + `RoutesComponent`
- **Routing**: `src/routes/RoutesComponent.js` defines all page routes with React Router v6.30.1

### Key Patterns

**Scroll State Management**: Global scroll position tracked in `App.js` via `window.onscroll`, passed as `scrollY` prop to pages that need it (Epic, MarsRoverPhotos, Multimedia) for "scroll to top" button functionality.

**API Data Fetching**: Pages use modern `useState` + `useEffect` pattern with optimized dependencies:
1. Initialize state with null data
2. Fetch from NASA API in `useEffect` with clean dependency arrays
3. Show `Loading` component until data arrives
4. Store response in component state
5. Error handling via try/catch with console.error logging

**Error Handling**: Enhanced `ErrorBoundary` component (`src/utils/ErrorBoundary.js`) with `componentDidCatch` lifecycle method for error logging and improved fallback UI.

### Pages

All pages follow similar structure with dedicated CSS files:

- `/` - Home landing page
- `/picture-of-the-day` - APOD with date picker navigation
- `/epic` - EPIC Earth imagery with date filter
- `/mars-rover-photos` - Curiosity rover photos with pagination
- `/multimedia` - NASA image/video search with pagination
- `*` - 404 error page

**Note**: Mars Weather feature removed (InSight mission ended Feb 2023, API deprecated)

### Components

- `Header.js` - Navigation header
- `Loading.js` - Loading state indicator
- `Error404.js` - 404 page content
- `EpicImage.js` - EPIC image gallery renderer
- `PreviewCardMultimedia.js` - Multimedia search result cards
- `ErrorBoundary.js` - React error boundary wrapper

### Pagination Pattern

Pages with pagination (MarsRoverPhotos, Multimedia) implement:
- Page state managed via `useState`
- URL constructed with page parameter
- "Previous" button only shown when page > 1
- Scroll to top on page change
- Current page display with validation (prevent page < 1)

## Technology Stack (Updated January 2025)

- **React 18.3.1** with modern hooks and createRoot API
- **React Router v6.30.1** for client-side routing
- **react-lazy-load 4.0.1** for image lazy loading (React 18 compatible)
- **react-icons 4.12.0** for icon components
- **Create React App 5.0.1** (react-scripts) build system
- **Node.js 18 Alpine** (Docker)
- **Nginx Alpine** for production serving
- **Testing**: @testing-library/react 13.4.0 (React 18 compatible)

**Removed Dependencies**:
- react-redux and redux (unused, ~60KB saved from bundle)

## Current State (January 2025 - Fully Modernized)

### Dependency Status ✓ ALL UPDATED
- **React**: 18.3.1 ✓
- **React Router**: 6.30.1 ✓
- **react-icons**: 4.12.0 ✓
- **react-lazy-load**: 4.0.1 (React 18 compatible) ✓
- **Testing libraries**: @testing-library/react 13.4.0 ✓
- **Node.js**: 18 Alpine (Dockerfile) ✓
- **react-redux/redux**: REMOVED (unused dependencies) ✓

### Production Bundle (Optimized)
- **Main JS**: 60.17 KB gzipped
- **Main CSS**: 12.65 KB gzipped
- **Total**: ~73 KB (excellent for SPA)
- **Build**: Compiles with ZERO warnings ✓

### API Endpoints Status
- **APOD** (Picture of the Day): ✓ Working
- **EPIC** (Earth imagery): ✓ Working
- **Mars Rover Photos**: ✓ Working
- **Multimedia Search**: ✓ Working
- **Mars Weather**: ✗ REMOVED (InSight mission ended Feb 2023)

### Production Deployment
- **Domain**: nasaapp.davidfdzmorilla.dev
- **Platform**: Docker + Nginx + Traefik reverse proxy
- **Port**: 3001 (external) → 80 (internal)
- **Status**: ✓ Production-ready, fully optimized
- **Health Check**: `/health` endpoint available
- **HTTPS**: Automatic TLS via Traefik
- **Docker Image Size**: 58.9 MB (multi-stage build)

## Modernization Completed (January 2025)

All 6 phases completed successfully. See `.claude/MODERNIZATION_SUMMARY.md` for detailed report.

### ✓ Phase 0: Assessment
- Audited dependencies (React 18.0.0 → 18.3.1, Router 6.3.0 → 6.30.1)
- Identified hardcoded API key (CRITICAL security issue - FIXED)
- Found Mars Weather API deprecated (feature removed)
- Identified unused Redux dependencies (removed, saved 60KB)

### ✓ Phase 1: Foundation Updates
- Updated testing libraries to React 18 compatible versions
- Updated react-lazy-load to 4.0.1 (React 18 support)
- Verified Node 18 compatibility in Dockerfile

### ✓ Phase 2: Dependency Modernization
- React 18.0.0 → 18.3.1
- React Router 6.3.0 → 6.30.1
- react-icons 4.3.1 → 4.12.0
- Removed Redux/react-redux (unused)

### ✓ Phase 3: Bug Fixes & API Restoration
- Removed deprecated Mars Weather feature
- Fixed ESLint warnings (unused variables, imports)
- Improved error handling (console.error + fallback data)
- Fixed React keys (removed Math.random(), added unique IDs)

### ✓ Phase 4: Code Quality & Refactoring
- Migrated to React 18 createRoot API (from ReactDOM.render)
- Enhanced ErrorBoundary with componentDidCatch
- Optimized useEffect dependencies (removed circular deps)
- Cleaned up unused state variables
- Tests updated and passing (1/1 ✓)

### ✓ Phase 5: Deployment & Testing
- Added nginx.conf with SPA routing, gzip, caching, security headers
- Fixed Docker build to inject API key at build-time
- Added health check endpoint (/health)
- Docker build tested successfully
- Container tested locally (all routes working)

### ✓ Phase 6: Documentation & Handoff
- Comprehensive deployment guide (`.claude/DEPLOYMENT.md`)
- API integration patterns documented
- Troubleshooting guide created
- Maintenance recommendations provided
- This file (CLAUDE.md) updated with all changes

## Development Guidelines

### When Updating Dependencies
1. **Always test after updates**: Run `npm start` and manually test all pages
2. **Check breaking changes**: Review CHANGELOG of packages before major updates
3. **Update incrementally**: Don't update everything at once
4. **Test Docker build**: Ensure `npm run build` and Docker build still work

### When Working with NASA APIs
1. **Use environment variable**: Never hardcode API keys
2. **Handle rate limits**: NASA APIs have rate limits (30 requests/hour for DEMO_KEY, 1000/hour for registered keys)
3. **Implement error handling**: APIs can be down or return errors
4. **Test with live API**: Always test with actual NASA API, not mock data

### When Modifying Components
1. **Follow existing patterns**: Use useState/useEffect for data fetching
2. **Maintain loading states**: Show Loading component while fetching
3. **Implement error boundaries**: Use ErrorBoundary for error handling
4. **Keep styles consistent**: Use existing CSS patterns

### Docker & Deployment
1. **Multi-stage builds**: Keep using multi-stage Dockerfile for smaller images
2. **Test locally first**: Use `docker build` and `docker run` before deploying
3. **Environment variables**: Ensure .env is properly configured
4. **nginx config**: Keep nginx config simple and stable

## Troubleshooting Common Issues

### "Module not found" errors
- Run `npm install` to ensure all dependencies are installed
- Clear node_modules and reinstall if issues persist

### API returns 403/401 errors
- Check that REACT_APP_NASA_API_KEY is set in .env
- Verify API key is valid at api.nasa.gov
- Check rate limits haven't been exceeded

### Docker build fails
- Ensure node_modules is in .dockerignore
- Check Dockerfile syntax
- Verify sufficient disk space

### Production site not accessible
- Check Traefik configuration
- Verify nginx is running in container
- Check Docker logs: `docker logs <container-name>`

## Agent System

This project uses a multi-agent system for modernization and maintenance. See `.claude/agents/` directory for:

- **Project Manager** (`orchestrator/project-manager.md`): Coordinates all modernization efforts
- **Frontend Agents**: Handle React development, refactoring, and dependency updates
- **API Specialists**: Monitor and fix NASA API integrations
- **DevOps Agents**: Manage Docker deployment and infrastructure
- **QA Agents**: Test features and validate updates

When working on this project, consult the relevant agent documentation for specific guidelines and quality gates.
