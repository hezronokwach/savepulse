package models

import (
	"math/rand"
	"time"

	"gorm.io/gorm"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

func generateShortID() string {
	letters := []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
	b := make([]rune, 4)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

type User struct {
	UserID      string `gorm:"primaryKey;uniqueIndex"`
	Email       string `gorm:"uniqueIndex;not null"`
	Password    string `gorm:"not null"`
	PhoneNumber string
	FirstName   string
	LastName    string
}

func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
	user.UserID = generateShortID()
	return
}

type Satelitte struct {
	SatelitteID       string `gorm:"primaryKey;uniqueIndex"`
	SatelitteName     string
	SatelitteLocation string
	ContactPerson     string
	ContactEmail      string
	ContactPassword   string
}

func (satelitte *Satelitte) BeforeCreate(tx *gorm.DB) (err error) {
	satelitte.SatelitteID = generateShortID()
	return
}

type DonorBlood struct {
	BloodID       string //`gorm:"primaryKey"`
	UserID        string // foreign key
	DonationDate  string
	BloodType     string
	Status        string
	SatelliteID   string // foreign key
	RegionalID    string // foreign key
	HospitalID    string //foreign key
	PatientNumber string
	PatientUserID string
	Feedback      string
	SourceType    string // New field to track the source
}

func (donorBlood *DonorBlood) BeforeCreate(tx *gorm.DB) (err error) {
	// Check if the BloodID is already set or if the source is not satellite
	if donorBlood.BloodID == "" && donorBlood.SourceType == "satellite" {
		donorBlood.BloodID = generateShortID()
	}
	return
}

type Regional struct {
	RegionID        string `gorm:"primaryKey;not null"`
	RegionName      string `gorm:"not null"`
	RegionLocation  string `gorm:"not null"`
	ContactPerson   string `gorm:"not null"`
	ContactEmail    string `gorm:"not null"`
	ContactPassword string `gorm:"not null"`
}

func (satelitte *Regional) BeforeCreate(tx *gorm.DB) (err error) {
	satelitte.RegionID = generateShortID()
	return
}

type Hospital struct {
	HospitalID       string `gorm:"primaryKey;not null"`
	HospitalName     string `gorm:"not null"`
	HospitalLocation string `gorm:"not null"`
	ContactPerson    string `gorm:"not null"`
	ContactEmail     string `gorm:"not null"`
	ContactPassword  string `gorm:"not null"`
}

func (satelitte *Hospital) BeforeCreate(tx *gorm.DB) (err error) {
	satelitte.HospitalID = generateShortID()
	return
}

type Emergency struct {
	EmergencyID      string `gorm:"primaryKey;not null"`
	HospitalID       string
	RegionalID       string
	RegionLocation string 
	BloodType string
}

func (satelitte *Emergency) BeforeCreate(tx *gorm.DB) (err error) {
	satelitte.EmergencyID = generateShortID()
	return
}

type HospitalRequest struct {
	RequestID          string      `gorm:"primaryKey" json:"id"`
	HospitalID  string    `json:"hospitalID"`
	BloodType   string    `json:"bloodType"`
	// UnitsNeeded int       `json:"unitsNeeded"`
	RequestedBy string    `json:"requestedBy"`
	Status      string    `json:"status"`
	ApproverID  string    `json:"approverID,omitempty"`
	CreatedAt   time.Time `json:"createdAt"`
	ApprovedAt  time.Time `json:"approvedAt,omitempty"`
}

func (satelitte *HospitalRequest) BeforeCreate(tx *gorm.DB) (err error) {
	satelitte.RequestID = generateShortID()
	return
}
