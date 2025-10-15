import "./ApiErrorMessage.css"

export default function ApiErrorMessage({ apiName = "NASA API", showShutdownNotice = true }) {
    return (
        <div className="api-error-container">
            <div className="api-error-card">
                <span className="error-icon">⚠️</span>
                <h2>Service Temporarily Unavailable</h2>
                <p className="error-message">
                    {apiName} is currently not responding.
                </p>

                {showShutdownNotice && (
                    <div className="shutdown-notice">
                        <p><strong>Note:</strong> NASA APIs may be unavailable due to government shutdown or maintenance.</p>
                        <p>This is not an error with this application.</p>
                    </div>
                )}

                <div className="error-actions">
                    <button onClick={() => window.location.reload()} className="retry-button">
                        🔄 Retry
                    </button>
                    <a href="/multimedia" className="working-features-button">
                        ✅ View Working Features
                    </a>
                </div>

                <div className="error-details">
                    <details>
                        <summary>Why is this happening?</summary>
                        <ul>
                            <li>NASA APIs may be down due to government shutdown</li>
                            <li>The service may be under maintenance</li>
                            <li>There may be temporary network issues</li>
                            <li>Some APIs have been deprecated and replaced</li>
                        </ul>
                    </details>
                </div>
            </div>
        </div>
    )
}
