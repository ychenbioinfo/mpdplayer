import subprocess


def read_settings(settings):
    data = settings.split()
    volume = data[1][:-1]
    if data[3] == "on":
        repeat = 1
    else:
        repeat = 0

    if data[5] == "on":
        shuffle = 1
    else:
        shuffle = 0

    if data[7] == "on":
        single = 1
    else:
        single = 0

    values = {"volume": volume,
              "repeat": repeat,
              "shuffle": shuffle,
              "single": single
              }

    return values


def read_play_info(data):
    infos = data.split()
    if infos[0] == '[paused]':
        play_mode = 0
    else:
        play_mode = 1

    music_numbers = infos[1].split('/')
    play_num = music_numbers[0][1:]
    total_num = music_numbers[1]

    times = infos[2].split('/')
    play_time = times[0]
    total_time = times[1]

    percentage = infos[3][1:-2]

    return {"play_mode": play_mode,
            "play_num": play_num,
            "total_num": total_num,
            "play_time": play_time,
            "total_time": total_time,
            "percentage": percentage,
            }


def read_status(data):
    status = dict()
    if len(data) == 1:
        status['mode'] = 0
        settings = read_settings(data[0])
    else:
        status['mode'] = 1
        status['name'] = data[0]
        settings = read_settings(data[2])
        playinfo = read_play_info(data[1])
        status.update(playinfo)

    status.update(settings)

    return status


def run_command(command: list):
    p = subprocess.Popen(command, stdin=subprocess.PIPE,
                         stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, err = p.communicate()
    status_lines = output.decode().splitlines()
    status = read_status(status_lines)
    return status


def get_playlist():
    p = subprocess.Popen(['mpc', 'playlist'], stdin=subprocess.PIPE,
                         stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, err = p.communicate()
    names = output.decode().splitlines()
    playlist = list()
    for i in range(len(names)):
        playlist.append({"index": i+1, "name": names[i]})

    return playlist

