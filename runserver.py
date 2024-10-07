from app.api.v1 import create_app
from app.api.v1.scraping.scrapers import scrape_jobs
from celery import shared_task
# import logging
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


app = create_app()

# Initialize Celery instance for Flask app
celery_app = app.extensions["celery"]

@shared_task(ignore_result=False)
def periodic_scrape_jobs():
   scrape_jobs()
   logger.info("Scraping jobs every 5 minutes")
if __name__ == '__main__':
   app.run()