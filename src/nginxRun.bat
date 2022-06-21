@echo off
cls
cd /d %~dp0 

if not exist "temp\" mkdir temp
if not exist "logs\" mkdir logs

nginx -s stop

del "logs\*.log"

nginx -c conf/nginx.conf
rem npm run serve 

