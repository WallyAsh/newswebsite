import os
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
from dotenv import load_dotenv
import json
import bbc


# Load environment variables from .env file
load_dotenv()

# Function to fetch BBC Urdu news using the API
def fetch_bbc_urdu_news():
    news = bbc.news.get_news(bbc.Languages.Urdu)
    news_stories = []

    for category in news.news_categories():
        section_news = news.news_category(category)
        
        for news_dict in section_news:
            title = news_dict['title']
            link = news_dict['news_link']
            # Check if the title contains 'Imran Khan'
            if 'عمران خان' in title:
                news_stories.append({"title": title, "link": link})
                if len(news_stories) >= 15:
                    break
        if len(news_stories) >= 15:
            break
    
    return news_stories

# Helper function to fetch the full article text
def fetch_article_text(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    article_text = ""

    # Find the main content of the article
    for p in soup.find_all("p"):
        article_text += p.text + " "
    
    return article_text

# Function to translate and summarize text using OpenAI GPT-4
def translate_and_summarize(title, text, client):
    prompt = f"""
    Your task is to:

    1. Translate the following title from Urdu to Norwegian:
    "{title}"

    2. Summarize the article IN NORWEGIAN, ensuring the translation is accurate and maintains the original meaning and context. 
    Then, create a concise summary of 500-600 words, highlighting the key points and important information. 
    The summary should be written in a clear, informative, and neutral tone suitable for a news website aimed at a Norwegian audience.

    Make sure to:
    - Preserve the original intent and tone of the article.
    - Use formal and professional language appropriate for news reporting.
    - Avoid adding any personal opinions or biases.
    - Ensure that the summary is coherent, logically structured, and easy to understand.
    - Start straight on the summary. Make it look like a real article.
    - Do not use any symbols like ### or *** to separate sections.

    Here is the Urdu text for translation and summarization:
    {text}
    """

    response = client.chat.completions.create(
      model="gpt-4o",
      messages=[
        {"role": "system", "content": "You are a highly skilled translator and summarizer with expertise in both Urdu and Norwegian."},
        {"role": "user", "content": prompt}
      ]
    )
    
    output = response.choices[0].message.content.split("\n\n", 1)
    translated_title = output[0].strip().replace('Title: ', '')
    summary = output[1].strip()
    
    return translated_title, summary

# Main function to fetch, translate, summarize, and save news
def main():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found. Please check your .env file.")
    client = OpenAI(api_key=api_key)
    
    news_stories = fetch_bbc_urdu_news()
    
    articles = []
    
    # Process the first five articles about Imran Khan
    for story in news_stories:
        title = story['title']
        link = story['link']
        
        article_text = fetch_article_text(link)
        translated_title, translated_and_summarized_text = translate_and_summarize(title, article_text, client)
        
        articles.append({
            "title": translated_title,
            "link": link,
            "summary": translated_and_summarized_text
        })
    
    with open('articles_imran_khan.json', 'w') as f:
        json.dump(articles, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()
