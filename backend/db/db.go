package db

import (
	"database/sql"
	"log"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "./knowledge.db")
	if err != nil {
		log.Fatal("Failed to open DB:", err)
	}
	query := `
	CREATE TABLE IF NOT EXISTS chunks (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		subject TEXT,
		chunk TEXT,
		embedding BLOB,
		source_file TEXT
	);`

	_, err = DB.Exec(query)
	if err != nil {
		log.Fatal("Failed to create table:", err)
	}
}
