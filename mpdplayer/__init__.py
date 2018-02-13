from flask import Flask


class AppMiddleware(object):
    def __init__(self, app, script_name=''):
        self.app = app
        self.script_name = script_name

    def __call__(self, environ, start_response):
        script_name = self.script_name
        if self.script_name:
            environ['SCRIPT_NAME'] = script_name
            path_info = environ['PATH_INFO']
            if path_info.startswith(script_name):
                environ['PATH_INFO'] = path_info[len(script_name):]

        return self.app(environ, start_response)


app = Flask(__name__)
# app.wsgi_app = AppMiddleware(app.wsgi_app, 'http://192.168.1.16:8080')
app.config.from_object('mpdplayer.config.Config')

import mpdplayer.views


