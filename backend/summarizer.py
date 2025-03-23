from transformers import pipeline

class EmailSummarizer:
    def __init__(self):
        self.summarizer = pipeline("summarization",model="t5-small")
    def summarize(self,email_text):
        summary = self.summarizer(email_text,max_length = 100,min_length = 5,do_sample = False)
        return summary[0]['summary_text']

def helper(email):
    
    summarizer = EmailSummarizer()
    summarized_email = summarizer.summarize(email["body"])
    email["body"]=summarized_email
    
    return email
