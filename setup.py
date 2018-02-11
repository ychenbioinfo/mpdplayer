from setuptools import setup

setup(
    name='mpdplayer',
    packages=['mpdplayer'],
    include_package_data=True,
    install_requires=[
        'click==6.7',
        'dominate==2.3.1',
        'Flask==0.12.2',
        'Flask-Bootstrap==3.3.7.1',
        'itsdangerous==0.24',
        'Jinja2==2.10',
        'MarkupSafe==1.0',
        'visitor==0.1.3',
        'Werkzeug==0.14.1',
    ],
)