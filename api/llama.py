from openai import OpenAI
import os
from dotenv import load_dotenv


load_dotenv()


api_llama = os.getenv('LLAMA_API')
client = OpenAI(
api_key = api_llama,
base_url = "https://api.llama-api.com")

response = client.chat.completions.create(
model="llama3.1-70b",
messages=[
    {"role": "system", "content": "Assistant is a large language model trained by OpenAI."},
    {"role": "user", "content": "Who were the founders of Microsoft?"}
],)

#print(response)
print(response.model_dump_json(indent=2))
print(response.choices[0].message.content)