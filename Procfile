release: python manage.py makemigrations && python manage.py migrate --run-syncdb
web: gunicorn studwall.wsgi --log-file=-