Первый запуск проекта (CMD):
1) call .\rentService\tools\setup.bat
2) call .\rentService\tools\run_server.bat (На вопрос о завершении пакетного файла ответ - N(нет))
3) http://127.0.0.1:8000/

Повторный запуск проекта (CMD):
1) call .\rentService\tools\run_server.bat (На вопрос о завершении пакетного файла ответ - N(нет))
2) http://127.0.0.1:8000/

Отключение проекта:
1) Ctrl + C

Очистка БД (CMD):
1) call .\rentService\tools\revert_database.bat

Пересоздание БД (CMD):
1) call .\rentService\tools\recreate_database.bat