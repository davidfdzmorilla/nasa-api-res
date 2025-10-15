import { useState } from 'react';
import './DateSelector.css';

export default function DateSelector({ selectedDate, onDateChange }) {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // Calculate date boundaries
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // GIBS data typically available from 2000-present, but use yesterday as max
    const maxDate = yesterday.toISOString().slice(0, 10);
    const minDate = '2000-01-01'; // GIBS historical data availability

    const handleDateChange = (newDate) => {
        onDateChange(newDate);
        setIsCalendarOpen(false);
    };

    const handleTodayClick = () => {
        handleDateChange(maxDate);
    };

    const handleYesterdayClick = () => {
        const twoDaysAgo = new Date(yesterday);
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 1);
        handleDateChange(twoDaysAgo.toISOString().slice(0, 10));
    };

    const handleLastWeekClick = () => {
        const lastWeek = new Date(yesterday);
        lastWeek.setDate(lastWeek.getDate() - 7);
        handleDateChange(lastWeek.toISOString().slice(0, 10));
    };

    const handleLastMonthClick = () => {
        const lastMonth = new Date(yesterday);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        handleDateChange(lastMonth.toISOString().slice(0, 10));
    };

    const handlePreviousDay = () => {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(currentDate.getDate() - 1);
        const newDate = currentDate.toISOString().slice(0, 10);
        if (newDate >= minDate) {
            handleDateChange(newDate);
        }
    };

    const handleNextDay = () => {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(currentDate.getDate() + 1);
        const newDate = currentDate.toISOString().slice(0, 10);
        if (newDate <= maxDate) {
            handleDateChange(newDate);
        }
    };

    const formatDisplayDate = (dateString) => {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isMaxDate = selectedDate === maxDate;
    const isMinDate = selectedDate === minDate;

    return (
        <div className="date-selector">
            <label className="date-selector-label">Imagery Date</label>

            {/* Quick Action Buttons */}
            <div className="date-quick-buttons">
                <button
                    className="quick-button"
                    onClick={handleTodayClick}
                    disabled={isMaxDate}
                >
                    Latest
                </button>
                <button
                    className="quick-button"
                    onClick={handleYesterdayClick}
                >
                    -1 Day
                </button>
                <button
                    className="quick-button"
                    onClick={handleLastWeekClick}
                >
                    -1 Week
                </button>
                <button
                    className="quick-button"
                    onClick={handleLastMonthClick}
                >
                    -1 Month
                </button>
            </div>

            {/* Date Navigation */}
            <div className="date-navigation">
                <button
                    className="date-nav-button"
                    onClick={handlePreviousDay}
                    disabled={isMinDate}
                    aria-label="Previous day"
                >
                    ◀
                </button>

                <div className="date-display-container">
                    <button
                        className="date-display-button"
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    >
                        <span className="date-icon">📅</span>
                        <span className="date-text">{formatDisplayDate(selectedDate)}</span>
                        <span className={`dropdown-arrow ${isCalendarOpen ? 'open' : ''}`}>▼</span>
                    </button>

                    {isCalendarOpen && (
                        <>
                            <div className="date-picker-dropdown">
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => handleDateChange(e.target.value)}
                                    min={minDate}
                                    max={maxDate}
                                    className="date-picker-input"
                                />
                                <div className="date-picker-info">
                                    <p>Available: {minDate} to {maxDate}</p>
                                    <p className="date-note">GIBS imagery updates daily</p>
                                </div>
                            </div>
                            <div
                                className="date-picker-backdrop"
                                onClick={() => setIsCalendarOpen(false)}
                            />
                        </>
                    )}
                </div>

                <button
                    className="date-nav-button"
                    onClick={handleNextDay}
                    disabled={isMaxDate}
                    aria-label="Next day"
                >
                    ▶
                </button>
            </div>

            {/* Date Info */}
            <div className="date-info">
                {isMaxDate && (
                    <span className="date-badge latest">Latest Available</span>
                )}
                {!isMaxDate && (
                    <span className="date-badge historical">
                        Historical ({Math.floor((yesterday - new Date(selectedDate)) / (1000 * 60 * 60 * 24))} days ago)
                    </span>
                )}
            </div>
        </div>
    );
}
