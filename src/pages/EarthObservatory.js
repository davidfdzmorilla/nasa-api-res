import { useState } from 'react';
import GIBSMap from '../components/gibs/GIBSMap';
import LayerSelector, { AVAILABLE_LAYERS } from '../components/gibs/LayerSelector';
import DateSelector from '../components/gibs/DateSelector';
import ComparisonView from '../components/gibs/ComparisonView';
import './EarthObservatory.css';

export default function EarthObservatory() {
    // Use yesterday's date (GIBS updates with a day delay)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const defaultDate = yesterday.toISOString().slice(0, 10);

    // Calculate date one week ago for comparison
    const oneWeekAgo = new Date(yesterday);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const defaultComparisonDate = oneWeekAgo.toISOString().slice(0, 10);

    const [date, setDate] = useState(defaultDate);
    const [dateLeft, setDateLeft] = useState(defaultComparisonDate);
    const [dateRight, setDateRight] = useState(defaultDate);
    const [layer, setLayer] = useState('VIIRS_SNPP_CorrectedReflectance_TrueColor');
    const [isComparisonMode, setIsComparisonMode] = useState(false);

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

            {/* View Mode Toggle */}
            <div className="view-mode-toggle">
                <button
                    className={`toggle-button ${!isComparisonMode ? 'active' : ''}`}
                    onClick={() => setIsComparisonMode(false)}
                >
                    <span className="toggle-icon">🗺️</span>
                    Single View
                </button>
                <button
                    className={`toggle-button ${isComparisonMode ? 'active' : ''}`}
                    onClick={() => setIsComparisonMode(true)}
                >
                    <span className="toggle-icon">⇔</span>
                    Compare View
                </button>
            </div>

            {/* Controls Container */}
            {!isComparisonMode ? (
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
            ) : (
                <div className="controls-container">
                    {/* Layer Selector (shared for both maps) */}
                    <div className="control-section full-width">
                        <LayerSelector
                            selectedLayer={layer}
                            onLayerChange={handleLayerChange}
                        />
                    </div>

                    {/* Date Selectors for Comparison */}
                    <div className="control-section">
                        <label className="comparison-label">Before Date</label>
                        <DateSelector
                            selectedDate={dateLeft}
                            onDateChange={setDateLeft}
                        />
                    </div>

                    <div className="control-section">
                        <label className="comparison-label">After Date</label>
                        <DateSelector
                            selectedDate={dateRight}
                            onDateChange={setDateRight}
                        />
                    </div>
                </div>
            )}

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
                {!isComparisonMode ? (
                    <GIBSMap
                        layerConfig={currentLayerInfo}
                        date={date}
                        onMapReady={handleMapReady}
                    />
                ) : (
                    <ComparisonView
                        layerConfig={currentLayerInfo}
                        dateLeft={dateLeft}
                        dateRight={dateRight}
                        onDateLeftChange={setDateLeft}
                        onDateRightChange={setDateRight}
                    />
                )}
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
                    <strong>🚧 Development Note:</strong> This is Phase 7.5 of the Earth Observatory feature.
                    {isComparisonMode ?
                        ' Compare mode allows you to visualize changes over time by displaying two maps side-by-side with synchronized navigation.' :
                        ' Switch to Compare View to visualize environmental changes over time.'
                    }
                </p>
            </div>
        </main>
    );
}
