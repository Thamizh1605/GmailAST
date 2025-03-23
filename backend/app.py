from flask import Flask, request, jsonify
from flask_cors import CORS
from email_fetcher import send_message, fetch_emails
from summarizer import helper
from prioritize import sort_emails
from spamdetect import filter_spam_emails
from meet_to_cal import extract_meetings
from languagetranslate import translate_emails
from chatbot import get_ollama_response
from autoreply import generate_email_reply

app = Flask(__name__)
CORS(app)

def get_filtered_emails():
    """Fetch emails and filter out spam."""
    all_emails = fetch_emails()
    spam_emails = filter_spam_emails(all_emails)
    filtered_emails = [email for email in all_emails if email not in spam_emails]
    return filtered_emails, spam_emails

@app.route('/get-mails', methods=['GET'])
def get_emails():
    """Fetch non-spam emails."""
    emails, _ = get_filtered_emails()
    language_converted_mails = translate_emails(emails)
    return jsonify(language_converted_mails), 200

@app.route('/spam', methods=['GET'])
def get_spam_emails():
    """Fetch spam emails."""
    _, spam_emails = get_filtered_emails()
    return jsonify(spam_emails), 200

@app.route('/send-email', methods=['POST', 'GET'])
def send_email():
    """Route to send an email with attachments."""
    if request.method == 'POST':
        try:
            if 'to' not in request.form or 'subject' not in request.form or 'body' not in request.form:
                return jsonify({"error": "Missing required fields"}), 400

            to = request.form['to']
            subject = request.form['subject']
            body = request.form['body']
            attachments = request.files.getlist('attachments')

            email_data = {
                "to": to,
                "subject": subject,
                "body": body,
                "attachments": [file.filename for file in attachments],
            }

            print("Email Data:", email_data)
            response = send_message(email_data['to'],email_data['subject'],email_data['body'],email_data['attachments'])

            return jsonify(response), 200 if "success" in response else 500
        except Exception as e:
            print(f"Error sending email: {e}")
            return jsonify({"error": str(e)}), 500

    return jsonify({"message": "Send an email via POST request"}), 200


@app.route('/chat', methods=['POST'])
def chat():
    """Chatbot for answering email-related queries."""
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({"error": "Query is required"}), 400

    emails, _ = get_filtered_emails()
    response = get_ollama_response(emails, data['query'])

    return jsonify({"response": response})

@app.route('/prioritize-emails', methods=['GET'])
def prioritize_emails():
    """Prioritize emails based on importance."""
    emails, _ = get_filtered_emails()
    if not emails:
        return jsonify({"error": "No emails found"}), 404

    return jsonify(sort_emails(emails)), 200

@app.route('/summarize', methods=['POST'])
def summarize_email():
    """Summarize email content."""
    data = request.get_json()
    if not data or "body" not in data:
        return jsonify({"error": "Invalid request data"}), 400

    return jsonify(helper(data)), 200

@app.route('/meetcal', methods=['GET'])
def get_meeting_times():
    """Extract meeting times from emails."""
    emails, _ = get_filtered_emails()
    if not emails:
        return jsonify({"error": "No emails found"}), 404

    return jsonify(extract_meetings(emails)), 200

@app.route('/autoreply', methods=['POST'])
def auto():
    """Generate an auto-reply based on the email content and response type."""
    data = request.get_json()
    if not data or "email" not in data or "response_type" not in data:
        return jsonify({'error': "Invalid input"}), 400

    email_body = data["email"]
    response_type = data["response_type"]

    reply = generate_email_reply(email_body, response_type)
    return jsonify({"body": reply}), 200

if __name__ == '__main__':
    app.run(debug=False, port=5000)
