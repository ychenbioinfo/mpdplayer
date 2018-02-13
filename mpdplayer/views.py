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


@app.route('/_play', methods=['POST'])
def play_music():
    if request.method == 'POST':
        command = ['mpc', 'play']
        play_info = run_command(command)
        return jsonify(play_info)


@app.route('/_pause', methods=['POST'])
def pause_music():
    if request.method == 'POST':
        p = subprocess.Popen(['mpc', 'pause'])
        return jsonify({'message': 'success'})


@app.route('/')
def index():
    return render_template('home.html')


