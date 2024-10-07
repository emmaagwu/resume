from flask import Flask
from ...config import config_dict
from flask_restx import Api
from .job import job_namespace as job_ns
from .utils.db import db
from flask_migrate import Migrate
from .scraping.models import ScrapedJob
from .celery_config import celery_init_app
# from app.api.v1.scraping.tasks import periodic_scrape_jobs

def create_app(config=config_dict['dev']):
    app = Flask(__name__)

    # Load configuration from the chosen config class
    app.config.from_object(config)

    # Initialize the database
    db.init_app(app)
    migrate = Migrate(app, db)

    # Initialize the API
    api = Api(app,
              version='1.0',
              title='Job Management API',
              description='API for managing jobs',
              authorizations='authorizations',
              security='Bearer Auth'
    )

    # Add the job namespace to the API
    api.add_namespace(job_ns)

    @app.shell_context_processor
    def make_shell_context():
        return {
            'db': db,
            'ScrapedJob': ScrapedJob
        }

    # Initialize Celery
    celery_app = celery_init_app(app)

    return app
