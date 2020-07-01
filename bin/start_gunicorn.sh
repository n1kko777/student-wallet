#!/bin/bash
source /home/n1kko777/code/student-wallet/env/bin/activate
exec gunicorn  -c "/home/n1kko777/code/student-wallet/gunicorn_config.py" studwall.wsgi
