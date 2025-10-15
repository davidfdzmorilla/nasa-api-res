import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './EarthObservatory.css';

export default function EarthObservatory() {
    // Use yesterday's date (GIBS updates with a day delay)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const defaultDate = yesterday.toISOString().slice(0, 10);

    const [date] = useState(defaultDate);
    const [layer] = useState('VIIRS_SNPP_CorrectedReflectance_TrueColor');

    // GIBS tile URL
    const gibsUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/${layer}/default/${date}/250m/{z}/{y}/{x}.jpg`;

    return (
        <main className="earth-observatory-page">
            <h2>Earth Observatory</h2>
            <p className="subtitle">NASA Global Imagery Browse Services (GIBS)</p>

            <div className="map-info">
                <span>Layer: True Color</span>
                <span>Date: {date}</span>
            </div>

            <div className="map-container">
                <MapContainer
                    center={[0, 0]}
                    zoom={2}
                    style={{ height: '600px', width: '100%' }}
                    maxZoom={8}
                >
                    <TileLayer
                        url={gibsUrl}
                        attribution='&copy; <a href="https://earthdata.nasa.gov/gibs">NASA GIBS</a>'
                        maxZoom={8}
                        tileSize={256}
                        noWrap={false}
                    />
                </MapContainer>
            </div>

            <div className="map-description">
                <h3>About This View</h3>
                <p>
                    This interactive map displays true-color satellite imagery of Earth from NASA's VIIRS instrument
                    aboard the Suomi-NPP satellite. The imagery shows Earth as it would appear from space,
                    including clouds, ice, and vegetation.
                </p>
                <p className="note">
                    <strong>Note:</strong> This is a proof-of-concept for Phase 7.1.
                    Additional layers, date selection, and comparison features will be added in future phases.
                </p>
            </div>
        </main>
    );
}
