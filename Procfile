release: python manage.py makemigrations && python manage.py migrate
web: gunicorn studwall.wsgi --log-file=-