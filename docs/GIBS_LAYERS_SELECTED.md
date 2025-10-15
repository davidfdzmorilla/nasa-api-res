# GIBS Imagery Layers - Selected for Phase 7

**Date**: October 15, 2025
**Phase**: 7.1 - Setup & Research
**Status**: ✅ Verified and Tested

## Overview

Selected 8 imagery layers from NASA GIBS API for the Earth Observatory feature. These layers provide diverse visualization capabilities for climate, weather, fires, vegetation, and ocean monitoring.

## Selected Layers

### 1. True Color (Visual Earth)
- **Layer ID**: `VIIRS_SNPP_CorrectedReflectance_TrueColor`
- **Satellite**: VIIRS/S-NPP
- **Resolution**: 250m
- **Format**: JPEG
- **Update Frequency**: Daily (NRT - Near Real-Time)
- **Use Case**: Natural Earth appearance, cloud cover, ice/snow
- **Status**: ✅ Tested - Working

**Tile URL Example**:
```
https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/2025-10-14/250m/{z}/{y}/{x}.jpg
```

---

### 2. Land Surface Temperature (Day)
- **Layer ID**: `MODIS_Terra_Land_Surface_Temp_Day`
- **Satellite**: MODIS/Terra
- **Resolution**: 1km
- **Format**: PNG
- **Update Frequency**: Daily
- **Use Case**: Heat waves, urban heat islands, surface temperature monitoring
- **Color Scale**: Blue (cold) to Red (hot)
- **Legend**: https://gibs.earthdata.nasa.gov/legends/MODIS_Terra_Land_Surface_Temp_Day

---

### 3. Vegetation Index (NDVI, 8-Day)
- **Layer ID**: `MODIS_Terra_NDVI_8Day`
- **Satellite**: MODIS/Terra
- **Resolution**: 500m
- **Format**: PNG
- **Update Frequency**: 8-day composite
- **Use Case**: Vegetation health, agricultural monitoring, deforestation
- **Color Scale**: Brown (no vegetation) to Green (healthy vegetation)
- **Values**: -0.2 to 1.0 (NDVI range)

---

### 4. Fire Detection and Thermal Anomalies
- **Layer ID**: `VIIRS_SNPP_Fires_375m_Day`
- **Satellite**: VIIRS/S-NPP
- **Resolution**: 375m
- **Format**: PNG
- **Update Frequency**: Daily (NRT)
- **Use Case**: Wildfire monitoring, active fire detection
- **Visualization**: Red/orange points showing fire locations
- **Critical for**: Emergency response, disaster monitoring

---

### 5. Cloud Top Temperature
- **Layer ID**: `MODIS_Aqua_Cloud_Top_Temp`
- **Satellite**: MODIS/Aqua
- **Resolution**: 5km
- **Format**: PNG
- **Update Frequency**: Daily
- **Use Case**: Weather patterns, storm intensity, hurricane tracking
- **Color Scale**: Cold clouds (high altitude) to warm clouds (low altitude)

---

### 6. Sea Surface Temperature
- **Layer ID**: `GHRSST_L4_MUR_Sea_Surface_Temperature`
- **Satellite**: Multi-sensor (MUR product)
- **Resolution**: 1km
- **Format**: PNG
- **Update Frequency**: Daily
- **Use Case**: Ocean currents, El Niño monitoring, marine ecosystems
- **Color Scale**: Purple (cold) to Red (warm)
- **Coverage**: Global oceans

---

### 7. Snow Cover
- **Layer ID**: `MODIS_Terra_Snow_Cover`
- **Satellite**: MODIS/Terra
- **Resolution**: 500m
- **Format**: PNG
- **Update Frequency**: Daily
- **Use Case**: Snowpack monitoring, water resources, climate change
- **Visualization**: White (snow) over terrain

---

### 8. Aerosol Index (Air Quality)
- **Layer ID**: `OMPS_NPP_Aerosol_Index_PyroCumuloNimbus`
- **Satellite**: OMPS/Suomi-NPP
- **Resolution**: 50km
- **Format**: PNG
- **Update Frequency**: Daily (NRT)
- **Use Case**: Air quality, smoke from fires, volcanic ash, dust storms
- **Color Scale**: Indicates aerosol presence and intensity

---

## Technical Specifications

### Base URL Pattern
```
https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/{LayerID}/default/{Date}/{TileMatrixSet}/{z}/{y}/{x}.{format}
```

### Common Parameters
- **Projection**: EPSG:4326 (Geographic, WGS84)
- **Tile Matrix Sets**:
  - `250m` (for VIIRS True Color)
  - `500m` (for MODIS products)
  - `1km`, `2km`, `5km` (depending on resolution)
- **Date Format**: `YYYY-MM-DD`
- **Zoom Levels**: Typically 0-8 (varies by layer)

### Authentication
- **None required** - GIBS is a public service
- **CORS**: Enabled (access-control-allow-origin: *)

## Testing Results

### Successful Tests (October 15, 2025)

1. **WMTS GetCapabilities**: ✅ Success
   - Endpoint: https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?SERVICE=WMTS&REQUEST=GetCapabilities
   - Response: Valid XML with 1000+ layers listed

2. **Tile Request (True Color)**: ✅ Success
   - URL: `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/2025-10-14/250m/2/1/0.jpg`
   - Status: HTTP 200
   - Size: 88.7 KB
   - Type: image/jpeg
   - Headers: Proper CORS, caching disabled

## Leaflet Integration

### URL Template for Leaflet TileLayer
```javascript
const gibsUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/${layerId}/default/${date}/250m/{z}/{y}/{x}.jpg`;

<TileLayer
  url={gibsUrl}
  attribution='&copy; NASA GIBS'
  maxZoom={8}
  tileSize={256}
/>
```

### Date Handling
- Use ISO 8601 format: `YYYY-MM-DD`
- For "today" imagery, use: `new Date().toISOString().slice(0, 10)`
- Most layers support historical dates (varies by layer, typically 2000-present)

## Layer Selection Rationale

| Layer | Priority | Rationale |
|-------|----------|-----------|
| True Color | HIGH | Most intuitive, shows Earth as seen from space |
| Fire Detection | HIGH | Critical for disaster monitoring and public safety |
| Temperature | MEDIUM | Climate awareness, heat wave monitoring |
| Vegetation | MEDIUM | Environmental health, deforestation tracking |
| Cloud Top Temp | MEDIUM | Weather and storm tracking |
| Sea Surface Temp | LOW | Specialized oceanography use case |
| Snow Cover | LOW | Seasonal/regional relevance |
| Aerosol Index | LOW | Air quality and pollution monitoring |

## Implementation Notes

### MVP (Phase 7.2-7.3)
Start with these 3 layers:
1. True Color (default layer)
2. Fire Detection
3. Land Surface Temperature

### Future Additions (Phase 7.4+)
Add remaining 5 layers once core functionality is stable.

### Performance Considerations
- True Color (JPEG) is smaller than PNG layers
- Some layers update hourly (NRT), others daily or weekly
- Tile caching recommended for performance

## Resources

- **GIBS Documentation**: https://nasa-gibs.github.io/gibs-api-docs/
- **Layer Metadata**: Available in GetCapabilities response
- **Color Maps/Legends**: https://gibs.earthdata.nasa.gov/legends/
- **NASA Worldview** (reference implementation): https://worldview.earthdata.nasa.gov

## Next Steps (Phase 7.2)

1. Create `GIBSMap.js` component with True Color layer
2. Test in development environment
3. Verify tile loading performance
4. Add layer selector UI for switching between layers

---

**Last Updated**: October 15, 2025
**Verified By**: Phase 7.1 Research
**Status**: Ready for POC implementation
