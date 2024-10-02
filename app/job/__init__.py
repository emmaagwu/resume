from flask_restx import Namespace
from .controllers import register_routes

job_namespace = Namespace('jobs', description='Job management')

register_routes(job_namespace)