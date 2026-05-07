@echo off
echo ========================================
echo Деплой Portfolio на GitHub
echo ========================================
echo.

REM Оновлюємо username в index.html
echo Оновлюю username...
powershell -Command "(Get-Content index.html) -replace 'yourusername', 'Solipsist-crypto' | Set-Content index.html"
echo ✅ Username оновлено

echo.
echo Ініціалізую Git...
git init
git add .
git commit -m "Initial commit: Portfolio site"
git branch -M main
git remote add origin https://github.com/Solipsist-crypto/Solipsist-crypto.github.io.git

echo.
echo ========================================
echo ЗАРАЗ ПОТРІБНО:
echo 1. Створити репозиторій на GitHub:
echo    - Назва: Solipsist-crypto.github.io
echo    - Public
echo    - БЕЗ README
echo.
echo 2. Після створення натисни Enter
echo ========================================
pause

echo.
echo Пушу на GitHub...
git push -u origin main

echo.
echo ========================================
echo ✅ ГОТОВО!
echo.
echo GitHub Pages автоматично активується!
echo.
echo Твій сайт буде доступний через 2-5 хвилин:
echo https://Solipsist-crypto.github.io
echo ========================================
pause
