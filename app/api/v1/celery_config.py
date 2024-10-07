from celery import Celery, Task
from flask import Flask
# from .scraping.tasks import periodic_scrape_jobs

def celery_init_app(app: Flask) -> Celery:
    class FlaskTask(Task):
        def __call__(self, *args: object, **kwargs: object) -> object:
            with app.app_context():
                return self.run(*args, **kwargs)

    celery_app = Celery(app.name, task_cls=FlaskTask)


    celery_app.conf.update(
        broker_url=app.config['CELERY_BROKER_URL'],
        result_backend=app.config['CELERY_RESULT_BACKEND'],
        beat_schedule=app.config['CELERYBEAT_SCHEDULE'],
        task_ignore_result=app.config['CELERY_TASK_IGNORE_RESULT']
    )



    celery_app.set_default()
    app.extensions["celery"] = celery_app
    return celery_app