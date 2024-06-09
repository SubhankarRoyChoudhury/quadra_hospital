## For Backend Django Service

1. Open another terminal

```Run the following commands.

cd server


sudo apt install python3-virtualenv
python3 -m venv env
source env/bin/activate
<!-- source ./config.sh -->
pip install -U pip
pip3 install -r requirements.txt
<!-- python3 manage.py collectstatic -->
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser
```
