import json

def create_credentials_json():
    """Get user input and create credentials.json file."""
    client_id = input("Enter your Google Client ID: ")
    client_secret = input("Enter your Google Client Secret: ")
    project_id = input("Enter your Google Project ID: ")
    redirect_uri = "http://localhost"

    credentials_data = {
        "installed": {
            "client_id": client_id,
            "project_id": project_id,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_secret": client_secret,
            "redirect_uris": [redirect_uri]
        }
    }

    # Save to credentials.json
    with open("credentials.json", "w") as f:
        json.dump(credentials_data, f, indent=4)
    
    print("✅ credentials.json file created successfully!")

if __name__ == "__main__":
    create_credentials_json()
