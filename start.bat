@echo off
chcp 65001 >nul
cls

echo ========================================
echo 🚀 Запуск Portfolio Site
echo ========================================
echo.

REM Перевірка Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python не знайдено. Встановіть Python 3.11+
    pause
    exit /b 1
)

echo ✅ Python знайдено
python --version
echo.

REM Запуск фронтенду
echo 🌐 Запускаю frontend...
start "Portfolio Site" cmd /k "python -m http.server 8000"
timeout /t 2 /nobreak >nul
echo ✅ Frontend запущено
echo    URL: http://localhost:8000
echo.

echo ========================================
echo ✅ Все готово!
echo.
echo 📱 Сайт: http://localhost:8000
echo.
echo Закрийте вікно сервера для зупинки
echo ========================================
echo.

REM Відкриваємо браузер
timeout /t 2 /nobreak >nul
start http://localhost:8000

pause