# # app/scraping/tasks.py

# # from ...v1.celery_config import celery_init_app
# from .scrapers import scrape_jobs
# from celery import shared_task
# # from app.api.v1 import create_app

# # app = create_app()

# # celery = celery_init_app(app)

# # @celery.task
# # @app.task
# @shared_task
# def periodic_scrape_jobs():
#     scrape_jobs()
