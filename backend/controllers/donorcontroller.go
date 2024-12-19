package controllers

import (
    "log"
    "net/http"

    "authorization/backend/initializers"
    "authorization/backend/models"
    "authorization/backend/utils"

    "github.com/gin-gonic/gin"
)

// donorform
func SatelitteBlood(c *gin.Context) {
    var donorInput struct {
        UserID string `json:"userID"`
        // DonationDate string `json:"donationDate"`
        // BloodType    string `json:"bloodType"`
        Status      string `json:"status"`
        SatelliteID string `json:"satelliteId"`
        SourceType  string `json:"sourceType"` // New field
    }

    if err := c.ShouldBindJSON(&donorInput); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
        return
    }
    formattedTime := utils.GetCurrentTimeInNairobi() // Format as YYYY-MM-DD HH:MM:SS

    donor := models.DonorBlood{
        UserID:       donorInput.UserID,
        DonationDate: formattedTime,
        // BloodType:    donorInput.BloodType,
        Status:      donorInput.Status,
        SatelliteID: donorInput.SatelliteID,
        SourceType:  donorInput.SourceType, // Set the source type
    }

    if err := initializers.DB.Create(&donor).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create donor record"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Donation request submitted successfully"})
}

func RegionBlood(c *gin.Context) {
    var donorInput struct {
        SerialId   string `json:"bloodID"`
        RegionalID string `json:"regionalID"`
        Status     string `json:"status"`
        SourceType string `json:"sourceType"` // New field
    }

    if err := c.ShouldBindJSON(&donorInput); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
        return
    }

    // Query the satellite record to find the UserID associated with the BloodID
    var satelliteRecord models.DonorBlood
    if err := initializers.DB.Where("blood_id = ? AND source_type = ?", donorInput.SerialId, "satellite").First(&satelliteRecord).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not find satellite record"})
        return
    }
    formattedTime := utils.GetCurrentTimeInNairobi() // Format as YYYY-MM-DD HH:MM:SS

    // Create the DonorBlood record for the regional process
    donor := models.DonorBlood{
        BloodID:      donorInput.SerialId,
        UserID:       satelliteRecord.UserID, // Set the UserID from the satellite record
        DonationDate: formattedTime,          // Set the auto-generated date and time
        RegionalID:   donorInput.RegionalID,
        Status:       donorInput.Status,
        SourceType:   donorInput.SourceType, // Set the source type
    }

    if err := initializers.DB.Create(&donor).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create donor record"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Donation request submitted successfully"})
}

func RegionUpdate(c *gin.Context) {
    var donorInput struct {
        SerialId   string `json:"bloodID"`
        RegionalID string `json:"regionalID"`
        BloodType  string `json:"bloodType"`
        Status     string `json:"status"`
        SourceType string `json:"sourceType"` // New field
    }

    if err := c.ShouldBindJSON(&donorInput); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
        return
    }

    // Query the satellite record to find the UserID associated with the BloodID
    var satelliteRecord models.DonorBlood
    if err := initializers.DB.Where("blood_id = ? AND source_type = ?", donorInput.SerialId, "satellite").First(&satelliteRecord).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not find satellite record"})
        return
    }
    formattedTime := utils.GetCurrentTimeInNairobi() // Format as YYYY-MM-DD HH:MM:SS

    // Create the DonorBlood record for the regional process
    donor := models.DonorBlood{
        BloodID:      donorInput.SerialId,
        UserID:       satelliteRecord.UserID, // Set the UserID from the satellite record
        DonationDate: formattedTime,          // Set the auto-generated date and time
        RegionalID:   donorInput.RegionalID,
        BloodType:    donorInput.BloodType,
        Status:       donorInput.Status,
        SourceType:   donorInput.SourceType, // Set the source type
    }

    if err := initializers.DB.Create(&donor).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create donor record"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Donation request submitted successfully"})
}

func HospitalUpdate(c *gin.Context) {
    var hospitalInput struct {
        SerialId      string `json:"bloodID"`
        HospitalID    string `json:"hospitalID"`
        PatientUserID string `json:"patientUserID"`
        PatientNumber string `json:"patientNumber"`
        Status        string `json:"status"`
        SourceType    string `json:"sourceType"` // New field
    }

    if err := c.ShouldBindJSON(&hospitalInput); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
        return
    }

    // Query the satellite record to find the UserID associated with the BloodID
    var regionalData models.DonorBlood
    if err := initializers.DB.Where("blood_id = ? AND source_type = ?", hospitalInput.SerialId, "regional").First(&regionalData).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not find satellite record"})
        return
    }
    log.Printf("Regional Data: %+v\n", regionalData)
    formattedTime := utils.GetCurrentTimeInNairobi() // Format as YYYY-MM-DD HH:MM:SS

    // Create the DonorBlood record for the regional process
    donor := models.DonorBlood{
        BloodID:       hospitalInput.SerialId,
        UserID:        regionalData.UserID, // Set the UserID from the satellite record
        DonationDate:  formattedTime,       // Set the auto-generated date and time
        HospitalID:    hospitalInput.HospitalID,
        BloodType:     regionalData.BloodType,
        PatientUserID: hospitalInput.PatientUserID,
        PatientNumber: hospitalInput.PatientNumber,
        Status:        hospitalInput.Status,
        SourceType:    hospitalInput.SourceType, // Set the source type
    }
    log.Printf("Regional Data: %+v\n", donor)


    if err := initializers.DB.Create(&donor).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create donor record"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Donation request submitted successfully"})
}

func EmergencyRequest(c *gin.Context) {
    var request struct {
        BloodType  string `json:"bloodType" binding:"required"`
        HospitalID string `json:"hospitalID" binding:"required"`
        RegionalID string `json:"regionalID" binding:"required"`
    }

    // Bind JSON input to the request struct
    if err := c.ShouldBindJSON(&request); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
        return
    }

    // Query the Regional table to get the RegionLocation
    var regional models.Regional
    if err := initializers.DB.Where("region_id = ?", request.RegionalID).First(&regional).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not find regional information"})
        return
    }

    // Create a new emergency record
    emergency := models.Emergency{
        HospitalID:     request.HospitalID,
        RegionalID:     request.RegionalID,
        RegionLocation: regional.RegionLocation,
        BloodType:      request.BloodType,
    }

    // Save the record to the database
    if err := initializers.DB.Create(&emergency).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not save emergency request"})
        return
    }

    // Respond with success message
    c.JSON(http.StatusOK, gin.H{"message": "Emergency request submitted successfully"})
}