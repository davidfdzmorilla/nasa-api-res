import { useState } from 'react';
import GIBSMap from '../components/gibs/GIBSMap';
import LayerSelector, { AVAILABLE_LAYERS } from '../components/gibs/LayerSelector';
import DateSelector from '../components/gibs/DateSelector';
import './EarthObservatory.css';

export default function EarthObservatory() {
    // Use yesterday's date (GIBS updates with a day delay)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const defaultDate = yesterday.toISOString().slice(0, 10);

    const [date, setDate] = useState(defaultDate);
    const [layer, setLayer] = useState('VIIRS_SNPP_CorrectedReflectance_TrueColor');

    const handleMapReady = (map) => {
        console.log('Map initialized:', map);
    };

    const handleLayerChange = (newLayerId) => {
        setLayer(newLayerId);
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    // Get current layer info
    const currentLayerInfo = AVAILABLE_LAYERS.find(l => l.id === layer);

    return (
        <main className="earth-observatory-page">
            <h2>Earth Observatory</h2>
            <p className="subtitle">NASA Global Imagery Browse Services (GIBS)</p>

            {/* Controls Container */}
            <div className="controls-container">
                {/* Layer Selector Control */}
                <div className="control-section">
                    <LayerSelector
                        selectedLayer={layer}
                        onLayerChange={handleLayerChange}
                    />
                </div>

                {/* Date Selector Control */}
                <div className="control-section">
                    <DateSelector
                        selectedDate={date}
                        onDateChange={handleDateChange}
                    />
                </div>
            </div>

            <div className="map-info-panel">
                <div className="info-item">
                    <span className="info-label">Layer:</span>
                    <span className="info-value">
                        {currentLayerInfo?.icon} {currentLayerInfo?.name}
                    </span>
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
                    layerConfig={currentLayerInfo}
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
                    <strong>{currentLayerInfo?.icon} {currentLayerInfo?.name}:</strong> {currentLayerInfo?.description}
                </p>
                <p>
                    <strong>Data Source:</strong> NASA's Global Imagery Browse Services (GIBS) provides
                    near real-time satellite imagery updated daily. Select from 8 different imagery layers
                    to explore Earth's atmosphere, oceans, land, and environmental conditions.
                </p>
                <p>
                    <strong>Category:</strong> {currentLayerInfo?.category} |
                    <strong> Resolution:</strong> 250m per pixel |
                    <strong> Update Frequency:</strong> Daily
                </p>
                <p className="note">
                    <strong>🚧 Development Note:</strong> This is Phase 7.3 of the Earth Observatory feature.
                    Additional capabilities coming soon: date selection, comparison tools, and natural disaster monitoring.
                </p>
            </div>
        </main>
    );
}
