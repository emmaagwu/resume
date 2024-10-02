# app/scraping/scraper.py

from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from utils.db import db  # Import the database instance
from .models import ScrapedJob  # Import the model for storing scraped jobs

def scrape_jobs():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        
        # Navigate to Indeed or other dynamic site
        page.goto('https://www.indeed.com/jobs?q=datascience')
        page.wait_for_timeout(3000)  # Adjust timeout as needed
        
        # Scroll to load all content
        last_height = page.evaluate("document.body.scrollHeight")
        while True:
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(2000)
            new_height = page.evaluate("document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

        content = page.content()
        browser.close()

    # Parse the page content
    soup = BeautifulSoup(content, 'lxml')
    listings = soup.find_all('td', class_='resultContent')

    scraped_data = []
    for listing in listings:
        title = listing.select_one('[title]').get_text()
        company_name = listing.select_one('[data-testid="company-name"]').get_text()
        company_location = listing.select_one('[data-testid="text-location"]').get_text()
        scraped_data.append((title, company_name, company_location))

    # Store in the database
    store_scraped_jobs(scraped_data)

def store_scraped_jobs(data):
    """Store the scraped job data into the database."""
    for title, company_name, company_location in data:
        # Check if the job already exists in the database
        existing_job = ScrapedJob.query.filter_by(title=title, company_name=company_name).first()
        if not existing_job:
            new_job = ScrapedJob(title=title, company_name=company_name, company_location=company_location)
            db.session.add(new_job)
    db.session.commit()
