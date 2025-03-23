import os
import base64
import datetime
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from email.mime.text import MIMEText
import mimetypes
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase

SCOPES = ['https://www.googleapis.com/auth/gmail.modify']

def authenticate_gmail():
    """Authenticates with Gmail API and returns a service instance."""
    creds = None

    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)

        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    return build('gmail', 'v1', credentials=creds)

def fetch_emails():
    """Fetch unread emails from Gmail and include all required details."""
    try:
        service = authenticate_gmail()
        results = service.users().messages().list(userId='me', maxResults=10, q="is:unread").execute()
        messages = results.get('messages', [])

        if not messages:
            return []

        emails = []
        for msg in messages:
            msg_data = service.users().messages().get(userId='me', id=msg['id']).execute()
            payload = msg_data.get("payload", {})
            headers = payload.get("headers", [])

            # Extract sender, subject, and time
            sender = next((h["value"] for h in headers if h["name"] == "From"), "Unknown Sender")
            subject = next((h["value"] for h in headers if h["name"] == "Subject"), "No Subject")
            timestamp = msg_data.get("internalDate", None)  # Email timestamp

            # Convert timestamp to ISO 8601 format
            email_time = "Unknown Time"
            if timestamp:
                email_time = datetime.datetime.utcfromtimestamp(int(timestamp) / 1000).isoformat() + "Z"

            # Extract email body (Handles both text/plain and text/html)
            body = "No Content"
            if "parts" in payload:
                for part in payload["parts"]:
                    if part["mimeType"] == "text/plain":
                        body = base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8")
                        break  # Prefer plain text over HTML
                    elif part["mimeType"] == "text/html":
                        body = base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8")
            else:
                if "body" in payload and "data" in payload["body"]:
                    body = base64.urlsafe_b64decode(payload["body"]["data"]).decode("utf-8")

            emails.append({
                "id": msg["id"],
                "from": sender,
                "subject": subject,
                "body": body,
                "time": email_time  # Now in "YYYY-MM-DDTHH:MM:SSZ" format
            })

        return emails

    except HttpError as e:
        print(f"An error occurred: {e}")
        return []

def create_message(to, subject, message_text, attachments=[]):
    """Creates an email message with optional attachments."""
    message = MIMEMultipart()
    message['to'] = to
    message['subject'] = subject

    # Attach the plain text email body
    message.attach(MIMEText(message_text, 'plain'))

    # Attach files if any
    for attachment in attachments:
        content_type, _ = mimetypes.guess_type(attachment)
        if content_type is None:
            content_type = 'application/octet-stream'

        main_type, sub_type = content_type.split('/', 1)

        with open(attachment, 'rb') as f:
            file_data = f.read()

        file_part = MIMEBase(main_type, sub_type)
        file_part.set_payload(file_data)
        base64.encodebytes(file_data)  # Encode in base64
        file_part.add_header('Content-Disposition', f'attachment; filename="{os.path.basename(attachment)}"')
        message.attach(file_part)

    # Encode the entire message
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode("utf-8")
    return {'raw': raw_message}

def send_message(to, subject, message_text, attachments=[]):
    """Sends an email using the Gmail API with optional attachments."""
    try:
        service = authenticate_gmail()
        message = create_message(to, subject, message_text, attachments)
        sent_message = service.users().messages().send(userId="me", body=message).execute()
        print(f"Message sent successfully! Message ID: {sent_message['id']}")
        return {"success": True, "message_id": sent_message['id']}
    except HttpError as e:
        print(f"An error occurred while sending the message: {e}")
        return {"error": str(e)}
