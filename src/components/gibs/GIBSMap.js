import { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './GIBSMap.css';

// Component to handle map events and show loading state
function MapEventsHandler({ onLoading }) {
    const [isLoading, setIsLoading] = useState(false);

    useMapEvents({
        loading: () => {
            setIsLoading(true);
            onLoading(true);
        },
        load: () => {
            setIsLoading(false);
            onLoading(false);
        },
    });

    return isLoading ? (
        <div className="map-loading-overlay">
            <div className="map-loading-spinner"></div>
            <span>Loading tiles...</span>
        </div>
    ) : null;
}

export default function GIBSMap({ layer, date, onMapReady }) {
    const [isLoading, setIsLoading] = useState(true);
    const [mapCenter] = useState([20, 0]); // Slightly north to show more land
    const [mapZoom] = useState(2);

    // GIBS tile URL
    const gibsUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/${layer}/default/${date}/250m/{z}/{y}/{x}.jpg`;

    const handleMapCreated = (map) => {
        if (onMapReady) {
            onMapReady(map);
        }
        // Initial load complete
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div className="gibs-map-wrapper">
            {isLoading && (
                <div className="map-initial-loading">
                    <div className="loading-spinner-large"></div>
                    <p>Initializing Earth Observatory...</p>
                </div>
            )}
            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '600px', width: '100%' }}
                maxZoom={8}
                minZoom={1}
                zoomControl={false} // We'll add it in a custom position
                whenReady={(e) => handleMapCreated(e.target)}
            >
                {/* Custom zoom control position */}
                <ZoomControl position="topright" />

                {/* GIBS Tile Layer */}
                <TileLayer
                    url={gibsUrl}
                    attribution='&copy; <a href="https://earthdata.nasa.gov/gibs" target="_blank" rel="noopener noreferrer">NASA GIBS</a>'
                    maxZoom={8}
                    minZoom={1}
                    tileSize={256}
                    noWrap={false}
                    bounds={[[-90, -180], [90, 180]]} // World bounds
                />

                {/* Map event handlers for tile loading */}
                <MapEventsHandler onLoading={setIsLoading} />
            </MapContainer>
        </div>
    );
}
