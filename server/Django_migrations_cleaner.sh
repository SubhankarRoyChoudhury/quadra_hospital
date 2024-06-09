# find . -type d -name __pycache__ -exec rm -fr {} \;
# find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
# find . -path "*/migrations/*.pyc" -delete
# echo "Migration Files Deleted Successfully."'
# pip install -U pip
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
echo "Migration Files Created Successfully."'
