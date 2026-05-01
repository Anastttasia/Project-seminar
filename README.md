Первый запуск проекта:
1) python -m venv .venv
2) .venv\Scripts\activate.bat
3) pip install -r requirements.txt
4) python ./rentService/manage.py runserver
5) http://127.0.0.1:8000/

Повторный запуск проекта:
1) .venv\Scripts\activate.bat
2) python ./rentService/manage.py runserver
3) http://127.0.0.1:8000/

Отключение проекта:
1) Ctrl + C
2) deactivate