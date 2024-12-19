package initializers

import (
	"log"
	"os"
	"path/filepath"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDb() {
	var err error
	dbPath := "./db2.db"

	// Ensure directory exists
	dbDir := filepath.Dir(dbPath)
	if err := os.MkdirAll(dbDir, 0755); err != nil {
		log.Fatalf("Failed to create database directory: %v", err)
	}

	// Set proper file permissions
	if err := os.Chmod(dbDir, 0755); err != nil {
		log.Printf("Failed to set directory permissions: %v", err)
	}

	// Create or open database file with write permissions
	if _, err := os.OpenFile(dbPath, os.O_RDWR|os.O_CREATE, 0666); err != nil {
		log.Fatalf("Failed to create/open database file: %v", err)
	}

	// Connect to database
	DB, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	log.Println("Successfully connected to database with write permissions")
}