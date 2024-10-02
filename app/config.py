from decouple import config


class Config:
   DEBUG = config('DEBUG', default=False, cast=bool)
   SECRET_KEY = config('SECRET_KEY')


class DevConfig(Config):
   DATABASE_URL = config('DATABASE_URL')