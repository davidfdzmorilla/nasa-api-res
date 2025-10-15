import { useState } from 'react';
import GIBSMap from '../components/gibs/GIBSMap';
import './EarthObservatory.css';

export default function EarthObservatory() {
    // Use yesterday's date (GIBS updates with a day delay)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const defaultDate = yesterday.toISOString().slice(0, 10);

    const [date] = useState(defaultDate);
    const [layer] = useState('VIIRS_SNPP_CorrectedReflectance_TrueColor');

    const handleMapReady = (map) => {
        console.log('Map initialized:', map);
    };

    return (
        <main className="earth-observatory-page">
            <h2>Earth Observatory</h2>
            <p className="subtitle">NASA Global Imagery Browse Services (GIBS)</p>

            <div className="map-info-panel">
                <div className="info-item">
                    <span className="info-label">Layer:</span>
                    <span className="info-value">True Color (VIIRS)</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Date:</span>
                    <span className="info-value">{date}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span className="info-value status-active">● Active</span>
                </div>
            </div>

            <div className="map-container">
                <GIBSMap
                    layer={layer}
                    date={date}
                    onMapReady={handleMapReady}
                />
            </div>

            <div className="map-controls-info">
                <div className="control-hint">
                    <strong>🖱️ Navigate:</strong> Click and drag to pan • Scroll to zoom
                </div>
                <div className="control-hint">
                    <strong>🎯 Zoom:</strong> Use +/- buttons or scroll wheel
                </div>
            </div>

            <div className="map-description">
                <h3>About This View</h3>
                <p>
                    This interactive map displays <strong>true-color satellite imagery</strong> of Earth from NASA's VIIRS instrument
                    aboard the Suomi-NPP satellite. The imagery shows Earth as it would appear from space,
                    including clouds, ice, snow, and vegetation in natural colors.
                </p>
                <p>
                    <strong>Data Source:</strong> NASA's Global Imagery Browse Services (GIBS) provides
                    near real-time satellite imagery updated daily. The imagery is captured at 250-meter resolution.
                </p>
                <p className="note">
                    <strong>🚧 Development Note:</strong> This is Phase 7.2 of the Earth Observatory feature.
                    Additional capabilities coming soon: multiple imagery layers, date selection,
                    comparison tools, and natural disaster monitoring.
                </p>
            </div>
        </main>
    );
}
