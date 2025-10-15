# NASA API React App - Maintenance Guide

This guide provides recommendations for maintaining the NASA API React application after modernization.

---

## Quick Reference

### Health Checks
```bash
# Application health
curl https://nasaapp.davidfdzmorilla.dev/health

# Docker container health
docker ps --filter name=nasa-api-res
docker inspect --format='{{.State.Health.Status}}' <container_id>

# Application logs
docker logs -f nasa-api-res-react-app --tail=100
```

### Update Commands
```bash
# Check for updates
npm outdated

# Update patch/minor versions
npm update

# Audit for vulnerabilities
npm audit

# Fix auto-fixable vulnerabilities
npm audit fix
```

---

## Monthly Maintenance Tasks

### 1. Dependency Updates (30 minutes)

Check for available updates:
```bash
npm outdated
```

Update patch and minor versions:
```bash
npm update
npm test
npm run build
```

**Important**: Always test after updates:
1. Run local dev server: `npm start`
2. Test all pages manually
3. Check browser console for errors
4. Run production build: `npm run build`

### 2. Security Audit (15 minutes)

```bash
# Check for vulnerabilities
npm audit

# Review severity levels
# - Critical/High: Address immediately
# - Moderate: Address within week
# - Low: Address in next maintenance window

# Auto-fix if possible
npm audit fix

# For unfixable issues:
npm audit fix --force  # Use with caution!
```

**Note**: Current vulnerabilities (9 total) are in react-scripts dependencies. These are known Create React App issues and not fixable without migrating to Vite.

### 3. NASA API Status Check (10 minutes)

Test all NASA API endpoints:
```bash
# APOD
curl "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"

# EPIC
curl "https://api.nasa.gov/EPIC/api/natural?api_key=DEMO_KEY"

# Mars Rover Photos
curl "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY"

# Multimedia
curl "https://images-api.nasa.gov/search?q=nasa"
```

Check NASA API status page: https://api.nasa.gov/

### 4. Docker Image Updates (10 minutes)

```bash
# Check for base image updates
docker pull node:18-alpine
docker pull nginx:alpine

# Rebuild if base images updated
docker compose build --no-cache
docker compose up -d
```

### 5. Application Logs Review (10 minutes)

```bash
# Check for errors
docker logs nasa-api-res-react-app --since 30d | grep -i error

# Check access patterns
docker logs nasa-api-res-react-app --since 30d | grep -i "GET /"

# Monitor response times
# (Set up monitoring tools like Prometheus/Grafana for better insights)
```

---

## Quarterly Maintenance Tasks

### 1. Major Dependency Updates (2-3 hours)

**Before updating**:
1. Read changelog for breaking changes
2. Check compatibility with React 18
3. Test in development first
4. Create backup: `git tag backup-$(date +%Y%m%d)`

**Update process**:
```bash
# Update one package at a time
npm install react-router-dom@latest
npm test
npm start  # Manual testing
npm run build

# If successful, commit
git add package.json package-lock.json
git commit -m "chore(deps): update react-router-dom to X.Y.Z"
```

**Packages to watch**:
- **react-icons**: Currently 4.12.0, v5.x has breaking changes
- **react-router-dom**: Currently 6.30.1, v7 will have breaking changes
- **react**: Currently 18.3.1, React 19 will require testing

### 2. Performance Audit (1 hour)

Run Lighthouse audit:
```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit (requires running server)
lighthouse https://nasaapp.davidfdzmorilla.dev --view
```

Check for:
- Performance score > 90
- Accessibility score > 90
- Best Practices score > 90
- SEO score > 90

Address any issues found.

### 3. Bundle Size Analysis (30 minutes)

```bash
# Build and check bundle size
npm run build

# Output shows:
# File sizes after gzip:
#   XX.XX kB  build/static/js/main.xxxxx.js
#   XX.XX kB  build/static/css/main.xxxxx.css
```

**Targets**:
- Main JS: < 70 KB gzipped
- Main CSS: < 15 KB gzipped
- Total: < 85 KB gzipped

If bundle grows significantly:
1. Check for new heavy dependencies
2. Consider code splitting
3. Review for unused code

### 4. Browser Compatibility Testing (1 hour)

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

Check all pages:
- Home: /
- Picture of the Day: /picture-of-the-day
- EPIC: /epic
- Mars Rover: /mars-rover-photos
- Multimedia: /multimedia
- 404: /nonexistent

### 5. Documentation Review (30 minutes)

Update if needed:
- `README.md` - Installation and setup
- `CLAUDE.md` - Architecture and patterns
- `.claude/DEPLOYMENT.md` - Deployment procedures
- `.claude/NASA_API_DOCUMENTATION.md` - API references

---

## Annual Maintenance Tasks

### 1. React Major Version Update (4-6 hours)

**When React 19 is stable**:

1. **Research Phase**:
   - Read React 19 announcement blog
   - Review breaking changes
   - Check third-party dependencies for React 19 support

2. **Preparation**:
   ```bash
   git checkout -b react-19-upgrade
   npm install react@19 react-dom@19
   ```

3. **Testing Phase**:
   - Run all tests: `npm test`
   - Manual testing of all pages
   - Check browser console for warnings
   - Test production build
   - Test Docker build

4. **Deployment**:
   - Merge to main if all tests pass
   - Deploy to production
   - Monitor for 24-48 hours

### 2. Security Audit (2-3 hours)

Comprehensive security review:
```bash
# Check for known vulnerabilities
npm audit

# Check dependencies for outdated security patches
npx npm-check-updates -u

# Review and test updates
npm install
npm test
npm run build
```

Security checklist:
- [ ] No hardcoded secrets in code
- [ ] .env not committed to git
- [ ] API keys rotated annually
- [ ] Docker images using latest security patches
- [ ] HTTPS enabled (via Traefik)
- [ ] Security headers configured (nginx.conf)
- [ ] No exposed sensitive endpoints

### 3. NASA API Integration Review (1-2 hours)

Check for:
- New NASA API endpoints
- Deprecated APIs
- Rate limit changes
- New API features

Actions:
- Update `.claude/NASA_API_DOCUMENTATION.md`
- Consider adding new NASA APIs
- Remove any newly deprecated endpoints

### 4. Performance Optimization (2-3 hours)

Review and optimize:
- [ ] Image optimization (WebP format?)
- [ ] Code splitting opportunities
- [ ] Lazy loading effectiveness
- [ ] Cache strategies (nginx.conf)
- [ ] CDN usage (if applicable)
- [ ] Bundle size reduction

### 5. Backup and Disaster Recovery Test (1 hour)

Test backup procedures:
```bash
# Backup Docker image
docker save nasa-api-res:latest | gzip > backup-$(date +%Y%m%d).tar.gz

# Test restore
docker load < backup-YYYYMMDD.tar.gz
docker run -d -p 8080:80 nasa-api-res:latest

# Verify application works
curl http://localhost:8080/health
```

Test recovery procedures:
- Database restore (if added in future)
- Configuration restore
- SSL certificate renewal

---

## Breaking Change Management

### When Breaking Changes Occur

1. **Assess Impact**:
   - Read changelog thoroughly
   - Identify affected code sections
   - Estimate effort (hours/days)

2. **Plan Migration**:
   - Create feature branch
   - Document migration steps
   - Allocate sufficient time for testing

3. **Execute Migration**:
   - Make changes incrementally
   - Test after each change
   - Keep changes focused and atomic

4. **Validate**:
   - Run full test suite
   - Manual testing on all pages
   - Production build test
   - Docker build test

5. **Document**:
   - Update CLAUDE.md
   - Add migration notes to commit message
   - Update documentation if patterns changed

### Common Breaking Changes

**React Router 7 (when released)**:
- Loader/Action API changes
- Route component changes
- Data fetching patterns

**Migration strategy**:
1. Read migration guide
2. Update one route at a time
3. Test thoroughly
4. Update documentation

**react-icons v5 (if needed)**:
- Import paths changed
- Some icons renamed/removed

**Migration strategy**:
1. Search for all icon imports: `grep -r "react-icons" src/`
2. Update imports one by one
3. Check visual consistency

---

## Monitoring Recommendations

### Application Monitoring

**Recommended Tools**:
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Performance Monitoring**: Lighthouse CI, Speedcurve
- **Error Tracking**: Sentry, Rollbar
- **Analytics**: Google Analytics, Plausible

**Setup Priority**:
1. Uptime monitoring (free tier available)
2. Error tracking (catch production bugs)
3. Performance monitoring (catch regressions)
4. Analytics (understand usage patterns)

### Infrastructure Monitoring

**Docker Health Checks**:
```bash
# Enable health check monitoring in Traefik
# Add to compose.yml labels:
- "traefik.http.services.nasa-app.loadbalancer.healthcheck.path=/health"
- "traefik.http.services.nasa-app.loadbalancer.healthcheck.interval=30s"
```

**Log Aggregation**:
- Use Docker logging drivers
- Consider ELK stack or Loki for centralized logging
- Set up log rotation to prevent disk filling

---

## Common Issues and Solutions

### Issue: API Rate Limit Exceeded

**Symptoms**: 429 responses from NASA APIs

**Solutions**:
1. Upgrade from DEMO_KEY to registered API key (1000 req/hour → free)
2. Implement client-side rate limiting
3. Add caching layer (Redis)
4. Batch requests where possible

### Issue: Build Failures After Updates

**Symptoms**: `npm run build` fails after dependency updates

**Solutions**:
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build

# If still failing, check for breaking changes
npm outdated
# Read changelogs for packages with major version changes
```

### Issue: Docker Build Slow

**Symptoms**: Docker build takes >5 minutes

**Solutions**:
1. Add more files to `.dockerignore`
2. Use Docker BuildKit: `DOCKER_BUILDKIT=1 docker build .`
3. Cache node_modules layer
4. Use smaller base images (already using Alpine)

### Issue: Production Site Down

**Checklist**:
1. Check Docker container: `docker ps`
2. Check container logs: `docker logs nasa-api-res-react-app`
3. Check nginx: `docker exec nasa-api-res-react-app nginx -t`
4. Check Traefik: Review Traefik dashboard
5. Check DNS: `nslookup nasaapp.davidfdzmorilla.dev`
6. Check SSL certificates: `curl -vI https://nasaapp.davidfdzmorilla.dev`

---

## Migration to Vite (Future Recommendation)

Create React App is in maintenance mode. Consider migrating to Vite in 2025-2026.

**Benefits**:
- Faster dev server (HMR < 100ms)
- Faster builds (esbuild vs Webpack)
- Smaller bundle sizes
- Better tree-shaking
- Modern by default

**Migration Steps** (high-level):
1. Install Vite and plugins
2. Create `vite.config.js`
3. Update `index.html`
4. Replace `react-scripts` commands
5. Update environment variable names
6. Test thoroughly
7. Update Dockerfile

**Estimated effort**: 4-8 hours

See: https://vitejs.dev/guide/migration.html

---

## Contact and Support

### Internal Team
- **DevOps**: For deployment and infrastructure issues
- **Frontend**: For React and UI issues
- **Security**: For security concerns and API key rotation

### External Resources
- **NASA API Support**: https://api.nasa.gov/ (check status page)
- **React Community**: https://react.dev/community
- **Stack Overflow**: Tag questions with `reactjs`, `docker`, `nginx`

### Emergency Contacts
- **Production Down**: Contact DevOps team immediately
- **Security Incident**: Contact security team, rotate API keys
- **Data Loss**: Restore from most recent backup

---

## Maintenance Log Template

Keep a maintenance log in your project management system:

```markdown
## Maintenance Log - [Month] [Year]

### Dependencies Updated
- [Package name]: [Old version] → [New version]
- Breaking changes: [Yes/No]
- Testing completed: [Yes/No]

### Security Issues Addressed
- [Issue description]
- Severity: [Critical/High/Medium/Low]
- Resolution: [How fixed]

### Performance Metrics
- Bundle size: [XX KB]
- Lighthouse score: [XX/100]
- Load time: [X.Xs]

### Issues Encountered
- [Issue 1]: [Resolution]
- [Issue 2]: [Resolution]

### Actions for Next Month
- [ ] [Action item 1]
- [ ] [Action item 2]
```

---

## Conclusion

Regular maintenance ensures the NASA API React application remains secure, performant, and up-to-date. Follow the schedules outlined in this guide to maintain application health and prevent technical debt accumulation.

**Key Principles**:
1. **Test after every update** - Don't skip testing
2. **Update incrementally** - One package at a time
3. **Monitor proactively** - Set up health checks
4. **Document changes** - Keep this guide updated
5. **Stay informed** - Follow React and NASA API news

For questions or issues, consult the documentation in `.claude/` or reach out to the development team.

**Last Updated**: January 2025
**Next Review**: July 2025
