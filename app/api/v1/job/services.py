from ..scraping.models import ScrapedJob
# from ..utils.db import db

def get_all_jobs(title=None, company_name=None, company_location=None, page=1, per_page=10):
    query = ScrapedJob.query

    # Apply search filters if present
    if title:
        query = query.filter(ScrapedJob.title.ilike(f"%{title}%"))
    if company_name:
        query = query.filter(ScrapedJob.company_name.ilike(f"%{company_name}%"))
    if company_location:
        query = query.filter(ScrapedJob.company_location.ilike(f"%{company_location}%"))

    # Paginate the results
    paginated_jobs = query.paginate(page=page, per_page=per_page, error_out=False)

    return paginated_jobs.items
