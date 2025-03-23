from langchain_ollama import ChatOllama
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnableSequence

def generate_email_reply(email_data, response_type):
    """
    Generate an AI-based email reply with only the response text.

    :param email_data: Dictionary containing email details.
    :param response_type: Type of response ('positive' or 'negative' or it can be other text if it is other text , read the body of the email and relate the response type to it and make the response email)
    :return: Reply text only.
    """

    prompt_template = """
    ### Incoming Email:
    - **Sender**: {sender}
    - **Subject**: {subject}
    - **Body**:
      {body}
    - **Response Type**: {response_type}

    ### Guidelines:
    1. Write a natural, professional response.
    2. Start with "Dear [Sender's Name]," or "Hello," if the name is unknown.
    3. If the response type is **positive**, confirm politely.
    4. If the response type is **negative**, decline politely while maintaining professionalism.
    5. Keep it clear and concise.
    6. End with "Best regards," followed by "Your Name".

    ### Reply:
    """

    # Load LLaMA 3.2 model
    model = ChatOllama(model="llama3.2:latest", temperature=0.3)

    # Create the prompt template
    prompt = PromptTemplate(
        template=prompt_template,
        input_variables=["sender", "subject", "body", "response_type"]
    )

    # Define sequence
    runnable_chain = prompt | model
    response = runnable_chain.invoke({
        "sender": email_data.get("from", "Unknown Sender"),
        "subject": email_data.get("subject", "No Subject"),
        "body": email_data.get("body", ""),
        "response_type": response_type
    })
    return response.content.strip()
