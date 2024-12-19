package utils

import (
    "time"
    "log"
)

// GetCurrentTimeInNairobi returns the current date and time in Nairobi, Kenya, formatted as a string.
func GetCurrentTimeInNairobi() string {
    location, err := time.LoadLocation("Africa/Nairobi")
    if err != nil {
        log.Printf("Could not load timezone: %v", err)
        return time.Now().Format("2006-01-02 15:04:05") // Default to UTC if there's an error
    }
    currentTime := time.Now().In(location)
    return currentTime.Format("2006-01-02 15:04:05") // Format as YYYY-MM-DD HH:MM:SS
}