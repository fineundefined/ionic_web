import google.generativeai as genai
import os
from dotenv import load_dotenv


def response(user_req: str):
    load_dotenv()
    genai.configure(api_key=os.getenv('GEMINI_API'))
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(user_req)
    return response.text

if __name__=="__main__":
    print(response("Hello gemini"))