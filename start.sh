#!/bin/bash

# Скрипт для швидкого запуску Portfolio Site

echo "🚀 Запуск Portfolio Site..."
echo ""

# Перевірка Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python не знайдено. Встановіть Python 3.11+"
    exit 1
fi

echo "✅ Python знайдено: $(python3 --version)"
echo ""

# Перевірка .env файлу
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Файл backend/.env не знайдено!"
    echo "📝 Створюю з шаблону..."
    cp backend/.env.example backend/.env
    echo ""
    echo "⚠️  ВАЖЛИВО: Відредагуйте backend/.env та додайте:"
    echo "   - TELEGRAM_BOT_TOKEN (отримайте у @BotFather)"
    echo "   - TELEGRAM_CHAT_ID (отримайте у @userinfobot)"
    echo ""
    read -p "Натисніть Enter після редагування .env файлу..."
fi

# Перевірка віртуального оточення
if [ ! -d "backend/venv" ]; then
    echo "📦 Створюю віртуальне оточення..."
    cd backend
    python3 -m venv venv
    cd ..
    echo "✅ Віртуальне оточення створено"
fi

# Активація віртуального оточення та встановлення залежностей
echo "📦 Встановлюю залежності..."
cd backend

# Активація залежно від ОС
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

pip install -q -r requirements.txt
echo "✅ Залежності встановлено"
echo ""

# Запуск бекенду у фоні
echo "🔧 Запускаю Flask backend..."
python app.py &
BACKEND_PID=$!
echo "✅ Backend запущено (PID: $BACKEND_PID)"
echo "   URL: http://localhost:5000"
echo ""

cd ..

# Запуск фронтенду
echo "🌐 Запускаю frontend..."
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000 &
    FRONTEND_PID=$!
    echo "✅ Frontend запущено (PID: $FRONTEND_PID)"
    echo "   URL: http://localhost:8000"
else
    echo "⚠️  Не вдалося запустити HTTP сервер"
    echo "   Відкрийте index.html вручну"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Все готово!"
echo ""
echo "📱 Frontend: http://localhost:8000"
echo "🔧 Backend:  http://localhost:5000"
echo "🏥 Health:   http://localhost:5000/api/health"
echo ""
echo "Натисніть Ctrl+C для зупинки"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Відкриваємо браузер
sleep 2
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:8000
elif command -v open &> /dev/null; then
    open http://localhost:8000
elif command -v start &> /dev/null; then
    start http://localhost:8000
fi

# Очікування Ctrl+C
trap "echo ''; echo '🛑 Зупинка серверів...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '✅ Зупинено'; exit" INT

wait