import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './ComparisonView.css';

// Sync component to keep maps in sync
function MapSync({ mapId, position, zoom, onPositionChange, onZoomChange }) {
    const map = useMap();
    const isUpdating = useRef(false);

    // Update this map when external position/zoom changes
    useEffect(() => {
        if (!isUpdating.current && position && zoom) {
            map.setView(position, zoom, { animate: false });
        }
    }, [position, zoom, map]);

    // Notify parent when this map changes
    useMapEvents({
        moveend: () => {
            if (!isUpdating.current) {
                isUpdating.current = true;
                const center = map.getCenter();
                onPositionChange(mapId, [center.lat, center.lng]);
                setTimeout(() => { isUpdating.current = false; }, 100);
            }
        },
        zoomend: () => {
            if (!isUpdating.current) {
                isUpdating.current = true;
                onZoomChange(mapId, map.getZoom());
                setTimeout(() => { isUpdating.current = false; }, 100);
            }
        }
    });

    return null;
}

// Tile layer with dynamic updates
function TileLayerUpdater({ layerConfig, date }) {
    const map = useMap();

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [layerConfig, date, map]);

    const gibsUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/${layerConfig.id}/default/${date}/${layerConfig.tileMatrixSet}/{z}/{y}/{x}.${layerConfig.format}`;

    return (
        <TileLayer
            key={`${layerConfig.id}-${date}`}
            url={gibsUrl}
            attribution='&copy; <a href="https://earthdata.nasa.gov/gibs" target="_blank" rel="noopener noreferrer">NASA GIBS</a>'
            maxZoom={8}
            minZoom={1}
            tileSize={256}
            noWrap={false}
            bounds={[[-90, -180], [90, 180]]}
            eventHandlers={{
                tileerror: () => {} // Silently handle tile errors in comparison view
            }}
        />
    );
}

export default function ComparisonView({
    layerConfig,
    dateLeft,
    dateRight
}) {
    const [mapPosition, setMapPosition] = useState([20, 0]);
    const [mapZoom, setMapZoom] = useState(2);

    const handlePositionChange = (_mapId, newPosition) => {
        setMapPosition(newPosition);
    };

    const handleZoomChange = (_mapId, newZoom) => {
        setMapZoom(newZoom);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="comparison-view">
            <div className="comparison-map-container">
                {/* Left Map */}
                <div className="comparison-map-wrapper left">
                    <div className="comparison-map-label">
                        <span className="map-label-text">{formatDate(dateLeft)}</span>
                        <span className="map-label-badge">Before</span>
                    </div>
                    <MapContainer
                        center={mapPosition}
                        zoom={mapZoom}
                        style={{ height: '600px', width: '100%' }}
                        maxZoom={8}
                        minZoom={1}
                        zoomControl={false}
                        preferCanvas={true}
                    >
                        <ZoomControl position="topright" />
                        <TileLayerUpdater layerConfig={layerConfig} date={dateLeft} />
                        <MapSync
                            mapId="left"
                            position={mapPosition}
                            zoom={mapZoom}
                            onPositionChange={handlePositionChange}
                            onZoomChange={handleZoomChange}
                        />
                    </MapContainer>
                </div>

                {/* Divider */}
                <div className="comparison-divider">
                    <div className="divider-line"></div>
                    <div className="divider-icon">⇔</div>
                </div>

                {/* Right Map */}
                <div className="comparison-map-wrapper right">
                    <div className="comparison-map-label">
                        <span className="map-label-text">{formatDate(dateRight)}</span>
                        <span className="map-label-badge">After</span>
                    </div>
                    <MapContainer
                        center={mapPosition}
                        zoom={mapZoom}
                        style={{ height: '600px', width: '100%' }}
                        maxZoom={8}
                        minZoom={1}
                        zoomControl={false}
                        preferCanvas={true}
                    >
                        <ZoomControl position="topright" />
                        <TileLayerUpdater layerConfig={layerConfig} date={dateRight} />
                        <MapSync
                            mapId="right"
                            position={mapPosition}
                            zoom={mapZoom}
                            onPositionChange={handlePositionChange}
                            onZoomChange={handleZoomChange}
                        />
                    </MapContainer>
                </div>
            </div>

            <div className="comparison-info">
                <div className="comparison-info-item">
                    <span className="info-icon">📅</span>
                    <span>Time Difference: {Math.abs(Math.floor((new Date(dateRight) - new Date(dateLeft)) / (1000 * 60 * 60 * 24)))} days</span>
                </div>
                <div className="comparison-info-item">
                    <span className="info-icon">🔄</span>
                    <span>Maps are synchronized (zoom and pan)</span>
                </div>
            </div>
        </div>
    );
}
