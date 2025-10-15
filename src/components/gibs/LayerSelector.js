import { useState } from 'react';
import './LayerSelector.css';

const AVAILABLE_LAYERS = [
    {
        id: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
        name: 'True Color',
        description: 'Natural color satellite imagery showing Earth as it appears from space',
        category: 'Visual',
        icon: '🌍',
        tileMatrixSet: '250m',
        format: 'jpg'
    },
    {
        id: 'VIIRS_NOAA20_CorrectedReflectance_TrueColor',
        name: 'True Color (NOAA-20)',
        description: 'Alternative true color imagery from NOAA-20 satellite',
        category: 'Visual',
        icon: '🌎',
        tileMatrixSet: '250m',
        format: 'jpg'
    },
    {
        id: 'MODIS_Terra_CorrectedReflectance_TrueColor',
        name: 'True Color (MODIS Terra)',
        description: 'True color imagery from MODIS Terra satellite',
        category: 'Visual',
        icon: '🌏',
        tileMatrixSet: '250m',
        format: 'jpg'
    },
    {
        id: 'MODIS_Aqua_CorrectedReflectance_TrueColor',
        name: 'True Color (MODIS Aqua)',
        description: 'True color imagery from MODIS Aqua satellite',
        category: 'Visual',
        icon: '🗺️',
        tileMatrixSet: '250m',
        format: 'jpg'
    },
    {
        id: 'MODIS_Terra_Land_Surface_Temp_Day',
        name: 'Land Surface Temperature',
        description: 'Daytime land surface temperature measurements',
        category: 'Temperature',
        icon: '🌡️',
        tileMatrixSet: '1km',
        format: 'png'
    },
    {
        id: 'MODIS_Terra_CorrectedReflectance_Bands721',
        name: 'False Color (Bands 7-2-1)',
        description: 'False color composite highlighting fires and burn scars',
        category: 'Analysis',
        icon: '🔥',
        tileMatrixSet: '250m',
        format: 'jpg'
    },
    {
        id: 'VIIRS_SNPP_CorrectedReflectance_BandsM11-I2-I1',
        name: 'Night Lights / Fires',
        description: 'Night-time infrared showing city lights and active fires',
        category: 'Night',
        icon: '🌃',
        tileMatrixSet: '250m',
        format: 'jpg'
    },
    {
        id: 'BlueMarble_NextGeneration',
        name: 'Blue Marble',
        description: 'Cloud-free composite of Earth (no daily updates)',
        category: 'Reference',
        icon: '🌐',
        tileMatrixSet: '500m',
        format: 'jpg'
    }
];

export default function LayerSelector({ selectedLayer, onLayerChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const currentLayer = AVAILABLE_LAYERS.find(layer => layer.id === selectedLayer);

    const handleLayerSelect = (layerId) => {
        onLayerChange(layerId);
        setIsOpen(false);
    };

    return (
        <div className="layer-selector">
            <label className="layer-selector-label">Imagery Layer</label>

            <div className="layer-selector-dropdown">
                <button
                    className="layer-selector-button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                >
                    <span className="layer-icon">{currentLayer?.icon}</span>
                    <span className="layer-name">{currentLayer?.name}</span>
                    <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
                </button>

                {isOpen && (
                    <div className="layer-selector-menu" role="listbox">
                        {AVAILABLE_LAYERS.map(layer => (
                            <div
                                key={layer.id}
                                className={`layer-option ${layer.id === selectedLayer ? 'selected' : ''}`}
                                onClick={() => handleLayerSelect(layer.id)}
                                role="option"
                                aria-selected={layer.id === selectedLayer}
                            >
                                <div className="layer-option-header">
                                    <span className="layer-icon">{layer.icon}</span>
                                    <span className="layer-option-name">{layer.name}</span>
                                    {layer.id === selectedLayer && (
                                        <span className="selected-checkmark">✓</span>
                                    )}
                                </div>
                                <div className="layer-option-description">
                                    {layer.description}
                                </div>
                                <div className="layer-option-category">{layer.category}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Close dropdown when clicking outside */}
            {isOpen && (
                <div
                    className="layer-selector-backdrop"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}

export { AVAILABLE_LAYERS };
