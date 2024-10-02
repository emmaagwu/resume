from flask import Flask
from ...config import config_dict
from flask_restx import Api
from .job import job_namespace as job_ns
from .utils.db import db
from flask_migrate import Migrate
from .scraping.models import ScrapedJob

def create_app(config=config_dict['dev']):
  app = Flask(__name__)

  app.config.from_object(config)

  db.init_app(app)

  migrate = Migrate(app, db)
  

  api = Api(app, 
        version='1.0', 
        title='Job Management API', 
        description='API for managing jobs',
        authorizations='authorizations',
        security='Bearer Auth'
  )

  api.add_namespace(job_ns)

  @app.shell_context_processor
  def make_shell_context():
    return {
      'db': db,
      'ScrapedJob': ScrapedJob
      }


  return app