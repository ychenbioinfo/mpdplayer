from flask import render_template, request, jsonify
import subprocess

from mpdplayer import app


def run_command(command: list):
    p = subprocess.Popen(command, stdin=subprocess.PIPE,
                         stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, err = p.communicate()
    status = output.decode().splitlines()
    play_info = {
        "name": status[0],
        "status": status[1],
        "settings": status[2]
    }
    return play_info


def read_status(data):
    status = dict()
    if len(data) == 1:
        status['mode'] == 'stop'
        settings = read_settings(data[0])
    else:
        status['name'] = status[0]

    status['volume'] = settings[0]
    status['repeat'] = settings[1]
    status['random'] = settings[2]
    status['single'] = settings[3]


def read_settings(settings):
    data = settings.split()
    volume = data[0][6:-1]
    if data[1][7:] == "on":
        repeat = 1
    else:
        repeat = 0

    if data[2][7:] == "on":
        random = 1
    else:
        random = 0

    if data[3][7:] == "on":
        single = 1
    else:
        single = 0

    return [volume, repeat, random, single]


@app.route('/_play', methods=['POST'])
def play_music():
    if request.method == 'POST':
        status = run_command(['mpc', 'play'])
        return jsonify(status)


@app.route('/_pause', methods=['POST'])
def pause_music():
    if request.method == 'POST':
        p = subprocess.Popen(['mpc', 'pause'])
        return jsonify({'message': 'success'})


@app.route('/_status', methods=['POST'])
def get_status():
    if request.method == 'POST':
        status = run_command(['mpc', 'status'])
        return jsonify(status)


@app.route('/')
def index():
    return render_template('home.html')


