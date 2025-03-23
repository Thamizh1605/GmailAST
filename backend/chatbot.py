from langchain_ollama import ChatOllama
from langchain.prompts import PromptTemplate

def get_ollama_response(data, query):
    context = "\n".join([f"From: {entry.get('from', 'Unknown')}\nSubject: {entry['subject']}\nBody: {entry.get('Translated_body', entry['body'])}\n" for entry in data])
    
    prompt_template = """
    You are an AI assistant. Answer the question as shorter as possible based on the provided data. If the answer is not in the data, just say, "answer is not available in the data".
    
    Data:
    {context}
    
    Question:
    {question}
    
    Answer:
    """
    
    model = ChatOllama(model="llama3.2:latest", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    response = model.invoke(prompt.format(context=context, question=query))
    
    return response.content

# Example Usage
data = [
    {"body": "Congratulations you 70% offer on the next sale", "subject": "Amazon Big Offer", "from": "Thamizh <thamizh.off.1605@gmail.com>"},
    {"Translated_body": "Hello, how are you?", "body": "வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?", "subject": "Vanakkam", "from": "Thamizh <thamizh.off.1605@gmail.com>"},
    {"body": "You are having meeting at 2:00pm today", "subject": "Job Meeting", "from": "Thamizh <thamizh.off.1605@gmail.com>"},
]
query = "Who sent the message about the offer?"

result = get_ollama_response(data, query)
print(result)
