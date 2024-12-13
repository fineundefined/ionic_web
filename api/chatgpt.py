
import os
from openai import OpenAI
from dotenv import load_dotenv

def get_response(request):
    load_dotenv()
    client = OpenAI(
        api_key=os.getenv('GPT_API')
    )
    try:
        completion = client.chat.completions.create(
                model="gpt-4o",
                    messages=[
                        {"role":"system", "content": "provide that shortest and the most accurate answer"},
                        {
                            "role": "user",
                            "content": [
                                        {
                                        "type": "text",
                                        "text": request
                                        }
                                    ]
                        }
                    ]
            )

        print("#"*50)
        print("ChatGpt: " + completion.choices[0].message.content)
        print("#"*50)


    except Exception as e:
        print(f"An error occurred: {e}")
    return str(completion.choices[0].message.content)

if __name__=="__main__":
    print(get_response("gello world"))