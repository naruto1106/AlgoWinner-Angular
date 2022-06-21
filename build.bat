@echo off
setlocal enabledelayedexpansion
rem C:\Perl64\bin\perl NugetChecker.pl

if %errorlevel% neq 0 exit /b %errorlevel%

cls
cd /d %~dp0

where npm
if %errorlevel% neq 0 (
	echo Please Install node.js in your machine!
	exit 1
)

where rimraf
if %errorlevel% neq 0 (
	call npm install -g rimraf
	echo rimraf is installed
) else (
	echo rimraf is already installed
)

where gulp
if %errorlevel% neq 0 (
	call npm install -g gulp
	echo gulp is installed
) else (
	echo gulp is already installed
)

"nuget\NuGet.exe" "Install" "FAKE" "-OutputDirectory" "packages" "-Version" "3.26.7" "-ExcludeVersion"

IF NOT [%1]==[] (
	SET TARGET="%1"
	ECHO Running target !TARGET!
	"packages\FAKE\tools\Fake.exe" "build.fsx" "target=!TARGET!"
) ELSE (
	ECHO Running default target
	"packages\FAKE\tools\Fake.exe" "build.fsx" "target="
)

pause