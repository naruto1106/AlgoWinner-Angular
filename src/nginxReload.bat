@echo off
cls
cd /d %~dp0 

nginx -s reload

