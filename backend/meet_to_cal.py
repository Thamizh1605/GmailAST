import json
import re
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
from langchain_ollama import ChatOllama
from langchain.prompts import PromptTemplate

def extract_meetings(email_list):
    model = ChatOllama(model="llama3.2:latest", temperature=0.3)

    prompt_template = """
    Extract meeting details from the given email text.

    Email Content:
    {context}

    Return a valid JSON object with one of these structures:

    1️⃣ If a specific date and time is found:
    {{"date": "YYYY-MM-DD", "time": "HH:MM AM/PM", "summary": "Event Title"}}

    2️⃣ If no specific date is found but relative time is mentioned (e.g., "in 10 minutes"):
    {{"relative_time": "X minutes" or "X hours", "summary": "Event Title"}}

    Only return JSON. No explanations, no extra text.
    """

    meetings = []
    for email in email_list:
        email_text = BeautifulSoup(email.get("body", ""), "html.parser").get_text()  # Remove HTML
        subject = email.get("subject", "Meeting")  # Default subject

        prompt = PromptTemplate(template=prompt_template, input_variables=["context"])
        response = model.invoke(prompt.format(context=email_text))

        try:
            response_text = response.content if hasattr(response, "content") else str(response)

            # Extract only the JSON part
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if not json_match:
                print(f"Skipping invalid response: {response_text}")
                continue  # Skip this email if response is invalid

            meeting_data = json.loads(json_match.group(0))  # Parse JSON

            date_str = meeting_data.get("date", "").strip()
            time_str = meeting_data.get("time", "").strip()
            relative_time = meeting_data.get("relative_time", "").strip()
            event_time = None

            # **Case 1: Specific Date & Time**
            if date_str and time_str and date_str.lower() != "no date" and time_str.lower() != "no time":
                try:
                    event_time = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %I:%M %p")
                except ValueError:
                    print(f"Skipping invalid date/time format: {date_str} {time_str}")
                    continue  # Skip if date-time format is incorrect

            # **Case 2: Relative Time Handling**
            elif relative_time:
                match = re.search(r"(\d+)\s*(minutes|hours)", relative_time)
                if match:
                    amount = int(match.group(1))
                    unit = match.group(2)
                    event_time = datetime.now() + timedelta(minutes=amount) if unit == "minutes" else datetime.now() + timedelta(hours=amount)

            # **Only append if a valid event time exists**
            if event_time:
                meetings.append({
                    "summary": subject if subject else meeting_data.get("summary", "Meeting"),
                    "start": event_time.isoformat()
                })

        except json.JSONDecodeError:
            print(f"Skipping JSON decoding error: {response_text}")

    return meetings

