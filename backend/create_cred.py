import json
import os
import firebase_admin
from firebase_admin import credentials,storage
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

FIREBASE_CREDENTIALS_PATH = "firebase_credentials.json"  # Your Firebase credentials
BUCKET_NAME = "your-firebase-storage-bucket-name"