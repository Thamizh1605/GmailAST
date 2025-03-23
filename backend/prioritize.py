def classify_priority(email):
    """
    Classifies email priority based on keywords and urgency.
    Returns a priority score (lower is higher priority).
    """
    high_priority_keywords = ["urgent", "important", "action required", "asap","reminder", "follow-up", "meeting", "schedule"]
    
    content = email.get("subject", "").lower() + " " + email.get("body", "").lower()
    
    # Assign priority score based on keyword presence
    if any(word in content for word in high_priority_keywords):
        return 1  # Highest priority
    return 2  # Lowest priority

def sort_emails(emails):
    """
    Sorts summarized emails based on priority and adds a 'priority' key.
    """
    if not emails or not isinstance(emails, list):
        return {"error": "Invalid email data"}
    
    try:
        for email in emails:
            email["priority"] = classify_priority(email)
        sorted_emails = sorted(emails, key=lambda email: email["priority"])
        
        return sorted_emails
    except Exception as e:
        return {"error": str(e)}
