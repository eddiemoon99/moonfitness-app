#!/bin/bash

chmod +x ./startup.sh
chmod +x ./run.sh

python3 -m virtualenv venv

source venv/bin/activate

pip install -r requirements.txt

python3 manage.py makemigrations

python3 manage.py migrate
