from urllib.parse import quote_plus

# Replace these with your actual credentials
username = quote_plus("cyberguard_user")
password = quote_plus("cyber@1234")

MONGO_URI = f"mongodb+srv://{username}:{password}@cluster0.mongodb.net"
DB_NAME = "Hackathon"
COLLECTION_NAME = "breaches"
