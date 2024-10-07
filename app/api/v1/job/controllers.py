from flask_restx import Resource, fields
from .services import get_all_jobs
from flask import request



def register_routes(api):
    job_model = api.model('Job', {
        'id': fields.Integer(readOnly=True, description='The unique identifier of a job'),
        'title': fields.String(required=True, description='The title of the job'),
        'company_name': fields.String(required=True, description='The name of the company'),
        'company_location': fields.String(required=True, description='The location of the company'),
    })

    @api.route('/')
    class JobList(Resource):
        @api.doc(params={
            'title': {'description': 'Search jobs by title', 'type': 'string'},
            'company_name': {'description': 'Search jobs by company name', 'type': 'string'},
            'company_location': {'description': 'Search jobs by location', 'type': 'string'},
            'page': {'description': 'Page number', 'type': 'int', 'default': 1},
            'per_page': {'description': 'Jobs per page', 'type': 'int', 'default': 10}
        })
        @api.marshal_list_with(job_model)
        def get(self):
            """List all jobs with optional search and pagination"""
            title = request.args.get('title')
            company_name = request.args.get('company_name')
            company_location = request.args.get('company_location')
            page = int(request.args.get('page', 1))
            per_page = int(request.args.get('per_page', 10))

            return get_all_jobs(title, company_name, company_location, page, per_page)