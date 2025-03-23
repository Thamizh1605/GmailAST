from deep_translator import GoogleTranslator
from langdetect import detect
from langcodes import Language

def translate_emails(emails):
    translated_emails = []
    
    for email in emails:
        body = email.get("body", "")  # ✅ Get body safely, default to empty string
        if not body.strip():  # ✅ Skip translation if body is empty
            email["translate"] = False
            email["Translated_body"] = ""
            email["source_language"] = "unknown"
        else:
            try:
                detected_lang = detect(body)
                full_lang_name = Language.get(detected_lang).display_name("en")  # Convert code to full name
                
                if detected_lang != "en":  # Translate only if it's not English
                    translated_text = GoogleTranslator(source=detected_lang, target="en").translate(body)
                    email["Translated_body"] = translated_text
                    email["translate"] = True
                    email["source_language"] = full_lang_name
                else:
                    email["translate"] = False
                    email["source_language"] = "English"

            except Exception as e:
                print(f"Error translating email: {e}")  # ✅ Log the error instead of crashing
                email["translate"] = False
                email["Translated_body"] = "Translation failed"
                email["source_language"] = "unknown"

        translated_emails.append(email)
    
    return translated_emails
