# app/scraping/models.py

from ..utils.db import db  # Import your database instance

class ScrapedJob(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    company_location = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<ScrapedJob {self.title} at {self.company_name}>'
