call .\rentService\tools\revert_database.bat
call .venv\Scripts\activate.bat
python ./rentService/manage.py migrate
deactivate
