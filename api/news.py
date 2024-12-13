import requests
from dotenv import load_dotenv
import os


def get_new(req:str):
    load_dotenv()
    api_key = os.getenv('NEWS_API')
    print(api_key)
    url = (f'https://newsapi.org/v2/top-headlines?'
       f'q={req}&'
       'sortBy=popularity&'
       f'apiKey={api_key}')
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()  # Convert the response to a JSON object
        articles = data.get('articles', [])  # Extract the list of articles
        
        if articles:
            print(f"Found {len(articles)} articles related to '{req}':")
            for i, article in enumerate(articles, start=1):
                title = article.get('title', 'No title')
                description = article.get('description', 'No description')
                url = article.get('url', 'No URL')
                date = article.get('publishedAt', 'No Time')
                img_url = article.get('urlToImage', 'NO IMAGE').split(',')
                print(f"{i}. Img: {img_url}\n  Title: {title}\n   Description: {description}\n   URL: {url}\n Published at: {date}\n")
        else:
            print(f"No articles found for '{req}'.")
    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")
   


def get_news1(req:str = 'artificial intelligence'):

        load_dotenv()
        api_key = os.getenv('NEWS_API')
        print(api_key)
        url = (f'https://newsapi.org/v2/top-headlines?'
        f'q={req}&'
        'sortBy=popularity&'
       f'apiKey={api_key}')
        response = requests.get(url)
        response.raise_for_status()

        raw_data = response.json()
        articles = raw_data.get('articles', [])
        
        processed_articles = [
            {
                "newsId": idx + 1,
                "title": article.get("title", "No Title"),
                "description": article.get("description", "No Content"),
                "img_url": article.get("urlToImage", ""),
                "source_url": article.get("url",""),
                "source": article.get("source", {}).get("name", "Unknown Source"),
                "publishedAt": article.get("publishedAt", "Unknown Date")
            }
            for idx, article in enumerate(articles)
        ]
        return raw_data, processed_articles


if __name__=="__main__":
    print(get_news1())