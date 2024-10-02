from flask import Flask
from .config import DevConfig
from flask_restx import Api
from .job import job_namespace as job_ns

def create_app(config=DevConfig):
  app = Flask(__name__)

  app.config.from_object(config)
  

  api = Api(app, 
        version='1.0', 
        title='Job Management API', 
        description='API for managing jobs',
        authorizations='authorizations',
        security='Bearer Auth'
  )

  api.add_namespace(job_ns)


  return app