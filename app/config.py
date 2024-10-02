from decouple import config


class Config:
   SECRET_KEY = config('SECRET_KEY', 'secrete')


class DevConfig(Config):
   SQLALCHEMY_DATABASE_URI = config('DATABASE_URL')
   DEBUG = config('DEBUG', default=False, cast=bool)
   SQLALCHEMY_ECHO = True


config_dict = {
   'dev': DevConfig
}
