# NASA API React App - Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- NASA API key (get one at https://api.nasa.gov/)
- Traefik reverse proxy running (for production)

## Environment Setup

1. Copy the environment template:
```bash
cp .env.template .env
```

2. Edit `.env` and add your NASA API key:
```bash
REACT_APP_NASA_API_KEY=your_actual_api_key_here
```

**IMPORTANT:** Never commit the `.env` file to git. It's already in `.gitignore`.

## Local Development

### Run without Docker
```bash
npm install
npm start
```
The app will open at http://localhost:3000

### Run with Docker (development mode)
```bash
docker run -v $(pwd):/app -v /app/node_modules -p 3000:3000 nasa-api-res-react-app npm start
```

## Production Deployment

### Build and Deploy with Docker Compose

1. Make sure your `.env` file has the correct NASA API key

2. Build and start the container:
```bash
docker compose up -d --build
```

3. Check container status:
```bash
docker compose ps
docker compose logs -f
```

4. Test the deployment:
```bash
curl http://localhost:3001/health
# Should return: healthy
```

### Manual Docker Build

If you need to build manually:
```bash
# Build the image
docker build --build-arg REACT_APP_NASA_API_KEY=$(grep REACT_APP_NASA_API_KEY .env | cut -d '=' -f2) -t nasa-api-res .

# Run the container
docker run -d -p 3001:80 --name nasa-app nasa-api-res

# Check health
curl http://localhost:3001/health
```

## Nginx Configuration

The app includes a custom nginx configuration (`nginx.conf`) that provides:

- **SPA Routing**: All routes redirect to `index.html` for React Router
- **Gzip Compression**: Reduces bandwidth usage
- **Static Asset Caching**: 1-year cache for JS/CSS/images
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- **Health Check Endpoint**: `/health` for monitoring

## Traefik Integration

The `compose.yml` includes Traefik labels for production deployment:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.nasa-api-res-react-app.rule=Host(`nasaapp.davidfdzmorilla.dev`)"
  - "traefik.http.routers.nasa-api-res-react-app.entrypoints=websecure"
  - "traefik.http.routers.nasa-api-res-react-app.tls.certresolver=myresolver"
```

**Requirements:**
- External Traefik network: `traefik_proxy`
- Traefik configured with HTTPS/TLS certificate resolver

## Health Monitoring

The container includes a Docker health check:
```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' <container_id>

# View health check logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' <container_id>
```

Health check runs every 30 seconds on the `/health` endpoint.

## Troubleshooting

### Container fails to start
```bash
# Check logs
docker compose logs

# Common issues:
# - Missing .env file
# - Invalid NASA API key
# - Port 3001 already in use
```

### API calls fail in production
- Verify `.env` file exists and has valid API key
- Check that environment variable was passed during build:
```bash
docker exec <container_id> env | grep REACT_APP
```
- Note: CRA embeds env vars at build time, not runtime
- If key changed, rebuild the image

### SPA routing not working (404 on direct URLs)
- Check nginx configuration is copied correctly
- Verify `/etc/nginx/conf.d/default.conf` in container:
```bash
docker exec <container_id> cat /etc/nginx/conf.d/default.conf
```

### Traefik not routing traffic
- Verify Traefik network exists: `docker network ls | grep traefik_proxy`
- Check Traefik logs for routing issues
- Verify DNS points to server IP
- Check Traefik dashboard for registered routes

## Updating the Application

1. Pull latest changes:
```bash
git pull
```

2. Rebuild and restart:
```bash
docker compose down
docker compose up -d --build
```

3. Clean up old images (optional):
```bash
docker image prune -f
```

## Performance Optimization

The production build includes:
- Minified and optimized JavaScript/CSS
- Code splitting for faster initial load
- Gzip compression via nginx
- Static asset caching (1 year)
- Lazy loading for images

**Bundle sizes (gzipped):**
- Main JS: ~60 KB
- Main CSS: ~12.65 KB
- Total: ~75 KB (excellent for SPA)

## Security Considerations

1. **API Key Security**: Never commit `.env` file or hardcode keys
2. **HTTPS**: Always use HTTPS in production (handled by Traefik)
3. **Security Headers**: nginx adds security headers automatically
4. **Dependency Updates**: Run `npm audit` regularly

## Backup and Rollback

### Backup
```bash
# Tag current production image
docker tag nasa-api-res:latest nasa-api-res:backup-$(date +%Y%m%d)

# Save image to file
docker save nasa-api-res:backup-$(date +%Y%m%d) | gzip > backup.tar.gz
```

### Rollback
```bash
# Stop current container
docker compose down

# Load backup image
docker load < backup.tar.gz

# Update compose to use backup tag and start
docker compose up -d
```

## Monitoring

### Check application health
```bash
curl https://nasaapp.davidfdzmorilla.dev/health
```

### Monitor container resources
```bash
docker stats nasa-api-res-react-app
```

### View real-time logs
```bash
docker compose logs -f --tail=100
```

## Support

For issues related to:
- NASA API: https://api.nasa.gov/
- Docker: https://docs.docker.com/
- React/CRA: https://create-react-app.dev/
- Traefik: https://doc.traefik.io/traefik/
