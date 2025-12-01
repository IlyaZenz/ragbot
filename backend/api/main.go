package main

import (
	"ragbot/db"
	"ragbot/routes"
)

func main() {
	db.InitDB()
	r := routes.SetupRouter()
	r.Run(":8080")
}
