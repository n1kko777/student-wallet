release: python manage.py makemigrations && python manage.py migrate && python manage.py runserver
web: gunicorn herokugisproject.wsgi --log-file=-