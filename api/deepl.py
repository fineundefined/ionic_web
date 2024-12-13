import requests
from dotenv import load_dotenv
import os

def translate_text(text:str, source_lang:str='auto_detect', target_lang:str='CZ'):
    
    api_url = "https://api-free.deepl.com/v2/translate"
    load_dotenv()
    
    
    api_key = os.getenv('DEEPL_API')
    payload = {}
    if(source_lang!='auto_detect'):
        
        payload = {
            "auth_key": api_key,  
            "text": text,   
            "source_lang": source_lang, 
            "target_lang": target_lang  
        }
    else:
            payload = {
            "auth_key": api_key,  
            "text": text,   
            "target_lang": target_lang  
        }
    if(not payload):
        return None
    try:
       
        
        response = requests.post(api_url, data=payload)
        response.raise_for_status()  
        translated_text = response.json()["translations"][0]["text"]
        detected_language = response.json()["translations"][0]["detected_source_language"]
        if(detected_language == 'NB'):
            detected_language = 'auto_detect'
        
        return translated_text,detected_language

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None
    
