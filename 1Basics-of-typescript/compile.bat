@echo off
REM Compile ignoring tsconfig.json entirely
REM Note: Windows paths use backslashes, but tsc often accepts forward slashes too.
REM We use backslashes for consistency with Windows 'dist' folder.
tsc .\src\%1.ts --ignoreConfig --outDir .\dist

REM Check if compilation was successful (ERRORLEVEL 0 means success)
if %ERRORLEVEL% equ 0 (
    node .\dist\%1.js
) else (
    echo ❌ Compilation failed. Aborting execution.
    exit /b 1
)   