from flask import Flask

app = Flask(__name__)
app.config.from_object('mpdplayer.config.Config')

import mpdplayer.views


