package initializers

import (
	"log"

	"authorization/backend/models"
)

// initializers/syncDb.go
func SyncDb() {
	log.Println("Starting database migration...")
	err := DB.AutoMigrate(&models.User{}, &models.Satelitte{}, &models.DonorBlood{}, &models.Hospital{}, &models.Regional{}, &models.Emergency{}, &models.HospitalRequest{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}
	log.Println("Database migration completed successfully")
}