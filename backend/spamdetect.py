import re
import json
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Sample dataset for training
training_data = [
    {"text": "Win a free iPhone now! Click here to claim.", "label": 1},
    {"text": "Your account has been compromised. Reset password immediately.", "label": 1},
    {"text": "Congratulations! You have won $1,000,000! Claim your prize.", "label": 1},
    {"text": "Security alert: Unusual login attempt detected.", "label": 1},
    {"text": "Reminder: Your meeting is scheduled for 3 PM today.", "label": 0},
    {"text": "Invoice for your recent purchase attached.", "label": 0},
    {"text": "Hello, how are you? Let's catch up soon!", "label": 0},
    {"text": "Don't forget to submit your project by Friday.", "label": 0}
]

# Convert to DataFrame
df = pd.DataFrame(training_data)
X_train, X_test, y_train, y_test = train_test_split(df["text"], df["label"], test_size=0.2, random_state=42)
model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(X_train, y_train)

# Evaluate the model
predictions = model.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, predictions):.2f}")

def is_spam(email):
    text = f"{email.get('subject', '')} {email.get('snippet', '')}"
    return model.predict([text])[0] == 1

def filter_spam_emails(emails):
    spam_emails = [email for email in emails if is_spam(email)]
    return spam_emails

