class Config(object):

    DEBUG = True


class Development(Config):
    pass


config = {
    'development': Development,
}

CONFIG = config['development']

