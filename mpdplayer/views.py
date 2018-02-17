from flask import render_template, request, jsonify

from mpdplayer import app
from .utils import run_command


@app.route('/_status', methods=['POST'])
def status():
    if request.method == 'POST':
        status = run_command(['mpc', 'status'])
        return jsonify(status)


@app.route('/_play', methods=['POST'])
def play_music():
    if request.method == 'POST':
        status = run_command(['mpc', 'play'])
        return jsonify(status)


@app.route('/_pause', methods=['POST'])
def pause_music():
    if request.method == 'POST':
        status = run_command(['mpc', 'pause'])
        return jsonify(status)


@app.route('/_stop', methods=['POST'])
def stop_music():
    if request.method == 'POST':
        status = run_command(['mpc', 'stop'])
        return jsonify(status)


@app.route('/_forward', methods=['POST'])
def forward_music():
    if request.method == 'POST':
        status = run_command(['mpc', 'next'])
        return jsonify(status)


@app.route('/_backward', methods=['POST'])
def backward_music():
    if request.method == 'POST':
        status = run_command(['mpc', 'prev'])
        return jsonify(status)


@app.route('/_vol_up', methods=['POST'])
def volume_up():
    if request.method == 'POST':
        status = run_command(['mpc', 'volume', '+10'])
        return jsonify(status)


@app.route('/_vol_down', methods=['POST'])
def volume_down():
    if request.method == 'POST':
        status = run_command(['mpc', 'volume', '-10'])
        return jsonify(status)


@app.route('/_shuffle', methods=['POST'])
def play_shuffle():
    if request.method == 'POST':
        status = run_command(['mpc', 'random'])
        return jsonify(status)


@app.route('/_repeat', methods=['POST'])
def play_repeat():
    if request.method == 'POST':
        status = run_command(['mpc', 'repeat'])
        return jsonify(status)


@app.route('/_single', methods=['POST'])
def play_single():
    if request.method == 'POST':
        status = run_command(['mpc', 'single'])
        return jsonify(status)


@app.route('/')
def index():
    return render_template('home.html')


