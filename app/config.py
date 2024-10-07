from decouple import config
from celery.schedules import crontab


class Config:
   SECRET_KEY = config('SECRET_KEY', 'secrete')
   CELERY_BROKER_URL = config('CELERY_BROKER_URL', default='redis://localhost:6379/0')
   CELERY_RESULT_BACKEND = config('CELERY_RESULT_BACKEND', default='redis://localhost:6379/0')
   CELERY_TASK_IGNORE_RESULT = True

   CELERYBEAT_SCHEDULE = {
        'scrape-jobs-every-day': {
            'task': 'runserver.periodic_scrape_jobs',
            'schedule': crontab(minute='*/5'),
            }
   }



class DevConfig(Config):
   SQLALCHEMY_DATABASE_URI = config('DATABASE_URL')
   DEBUG = config('DEBUG', default=False, cast=bool)
   SQLALCHEMY_ECHO = True


config_dict = {
   'dev': DevConfig
}
