@echo off
cls
cd /d %~dp0 

nginx -s stop
rem npm run serve 

